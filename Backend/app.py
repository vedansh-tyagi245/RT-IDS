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
collection = db['requests_log']

def extract_request_data(method):
    # Get client IP from X-Forwarded-For
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip_list = [ip.strip() for ip in x_forwarded_for.split(',')]
        client_ip = ip_list[-3] if len(ip_list) >= 3 else ip_list[0]
    else:
        client_ip = request.remote_addr

    # Get destination IP (server IP)
    server_ip = socket.gethostbyname(socket.gethostname())

    # Get source and destination ports
    source_port = request.environ.get('REMOTE_PORT')
    server_port = request.environ.get('SERVER_PORT')

    # Current timestamp
    timestamp = datetime.now(ZoneInfo("Asia/Kolkata")).isoformat()

    # HTTP details
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
    collection.insert_one(data)  # Save to MongoDB
    return jsonify({"status": "success"}), 200

@app.route('/', methods=['POST'])
def post_handler():
    data = extract_request_data("POST")
    collection.insert_one(data)  # Save to MongoDB
    return jsonify({"status": "success"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
