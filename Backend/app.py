from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Atlas Connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['RT_IDS_DB']
requests_collection = db['requests_log']
blocked_ips_collection = db['blocked_ips']
logs = db['logs']


def extract_request_data(method):
    timestamp = datetime.now(ZoneInfo("Asia/Kolkata"))
    iso_timestamp = timestamp.isoformat()

    # --- Extract IP Address (Early) ---
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip_list = [ip.strip() for ip in x_forwarded_for.split(',')]
        client_ip = ip_list[-3] if len(ip_list) >= 3 else ip_list[0]
    else:
        return {"status": False, "message": "Your request failed as we are unable to detect your IP"}

    # --- Filter 1: Referer Check ---
    referer = request.headers.get("referer")
    if referer != "https://rt-ids.vercel.app/":
        blocked_ips_collection.insert_one({"ip": client_ip, "reason": "Invalid Referer", "timestamp": timestamp})
        logs.insert_one({
            "message": f"{iso_timestamp}: {client_ip} blocked due to wrong referer - {referer}",
            "ip": client_ip,
            "referer": referer,
            "reason": "Invalid Referer",
            "timestamp": timestamp
        })
        return {
            "status": False,
            "message": f"IP blocked due to wrong referer: {referer}",
            "blocked_ip": client_ip
        }

    # --- Filter 2: Blocked IP Check ---
    if blocked_ips_collection.find_one({"ip": client_ip}):
        return {"status": False, "message": "Access denied. Your IP is blocked.", "blocked_ip": client_ip}

    # --- Filter 3: Rate Limiting ---
    one_minute_ago = timestamp - timedelta(minutes=1)
    request_count = requests_collection.count_documents({
        "client_ip": client_ip,
        "timestamp": {"$gte": one_minute_ago.isoformat()}
    })

    if request_count >= 20:
        blocked_ips_collection.insert_one({"ip": client_ip, "reason": "Rate Limit Exceeded", "timestamp": timestamp})
        logs.insert_one({
            "message": f"{iso_timestamp}: {client_ip} blocked due to exceeding rate limit - {referer}",
            "ip": client_ip,
            "reason": "Rate Limit Exceeded",
            "timestamp": timestamp
        })
        return {
            "status": False,
            "message": f"IP {client_ip} blocked for exceeding 20 requests per minute",
            "blocked_ip": client_ip
        }

    # --- If Passed All Filters, Gather Request Metadata ---
    server_ip = socket.gethostbyname(socket.gethostname())
    source_port = request.environ.get('REMOTE_PORT')
    server_port = request.environ.get('SERVER_PORT')
    http_version = request.environ.get('SERVER_PROTOCOL')

    host_header = request.headers.get("Host")
    user_agent = request.headers.get("User-Agent")
    accept_header = request.headers.get("Accept")
    cookies = request.cookies
    connection_type = request.headers.get("Connection")
    content_length = request.content_length
    approx_size = len(str(request.headers)) + (content_length or 0)

    return {
        "client_ip": client_ip,
        "destination_ip": server_ip,
        "source_port": source_port,
        "server_port": server_port,
        "timestamp": iso_timestamp,
        "method": method,
        "http_version": http_version,
        "host_name": host_header,
        "user_agent": user_agent,
        "accept_header": accept_header,
        "referer": referer,
        "cookies": dict(cookies),
        "connection_type": connection_type,
        "approx_packet_size": approx_size
    }


@app.route('/', methods=['GET'])
def get_handler():
    data = extract_request_data("GET")
    if data.get("status") is False:
        return jsonify(data), 403
    requests_collection.insert_one(data)
    return jsonify({"status": "success"}), 200


@app.route('/', methods=['POST'])
def post_handler():
    data = extract_request_data("POST")
    if data.get("status") is False:
        return jsonify(data), 403
    requests_collection.insert_one(data)
    return jsonify({"status": "success"}), 200


@app.route('/blocked-ips', methods=['GET'])
def get_blocked_ips():
    ips = list(blocked_ips_collection.find({}, {"_id": 0}))
    return jsonify(ips), 200


@app.route('/block-ip/<ip>', methods=['DELETE'])
def unblock_ip(ip):
    result = blocked_ips_collection.delete_one({"ip": ip})
    if result.deleted_count == 0:
        return jsonify({"error": "IP not found"}), 404
    return jsonify({"message": f"IP {ip} unblocked successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
