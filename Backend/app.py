from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
from datetime import datetime
from zoneinfo import ZoneInfo
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://vedanshtyagibrd19:x0RqL4V6Q1AT7q5M@cluster0.ihr7fdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['RT_IDS_DB']
requests_collection = db['requests_log']
blocked_ips_collection = db['blocked_ips']


def extract_request_data(method):
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip_list = [ip.strip() for ip in x_forwarded_for.split(',')]
        client_ip = ip_list[-3] if len(ip_list) >= 3 else ip_list[0]


    server_ip = socket.gethostbyname(socket.gethostname())
    source_port = request.environ.get('REMOTE_PORT')
    server_port = request.environ.get('SERVER_PORT')
    timestamp = datetime.now(ZoneInfo("Asia/Kolkata")).isoformat()
    http_version = request.environ.get('SERVER_PROTOCOL')

    host_header = request.headers.get("Host")
    user_agent = request.headers.get("User-Agent")
    accept_header = request.headers.get("Accept")
    referer = request.headers.get("Referer")
    cookies = request.cookies
    connection_type = request.headers.get("Connection")
    content_length = request.content_length
    approx_size = len(str(request.headers)) + (content_length or 0)

    return {
        "client_ip": client_ip,
        "destination_ip": server_ip,
        "source_port": source_port,
        "server_port": server_port,
        "timestamp": timestamp,
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

    # Check if client_ip is blocked
    if blocked_ips_collection.find_one({"ip": data["client_ip"]}):
        return jsonify({"error": "Access denied. Your IP is blocked."}), 403

    requests_collection.insert_one(data)
    return jsonify({"status": "success"}), 200


@app.route('/', methods=['POST'])
def post_handler():
    data = extract_request_data("POST")

    # Check if client_ip is blocked
    if blocked_ips_collection.find_one({"ip": data["client_ip"]}):
        return jsonify({"error": "Access denied. Your IP is blocked."}), 403

    requests_collection.insert_one(data)
    return jsonify({"status": "success"}), 200


# -------------------------------
# Blocked IPs Management Endpoints
# -------------------------------

@app.route('/block-ip', methods=['POST'])
def block_ip():
    ip_data = request.get_json()
    ip = ip_data.get("ip")
    if not ip:
        return jsonify({"error": "IP is required"}), 400

    # Avoid duplicates
    if blocked_ips_collection.find_one({"ip": ip}):
        return jsonify({"message": "IP already blocked"}), 200

    blocked_ips_collection.insert_one({"ip": ip})
    return jsonify({"message": f"IP {ip} blocked successfully"}), 201


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
