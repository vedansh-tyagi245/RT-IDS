from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_handler():
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
    timestamp = datetime.now().isoformat()

    # http version
    http_version = request.environ.get('SERVER_PROTOCOL')  # e.g., "HTTP/1.1"

    # host or domain name
    host_header = request.headers.get("Host")

    # getting user agent
    user_agent = request.headers.get("User-Agent")

    # getting accept_header
    accept_header = request.headers.get("Accept")

    # getting referer (previous page)
    referer = request.headers.get("Referer")

    # getting cookies
    cookies = request.cookies

    # Get the connection type
    connection_type = request.headers.get("Connection")

    # Get the approx packet size
    content_length = request.content_length
    approx_size = len(str(request.headers)) + (request.content_length or 0)

    return jsonify({
        "client_ip": client_ip,
        "destination_ip": server_ip,
        "source_port": source_port,
        "server_port": server_port,
        "timestamp": timestamp,
        "method": "GET",
        "http_version": http_version,
        "host_name": host_header,
        "user_agent": user_agent,
        "accept_header": accept_header,
        "referer": referer,
        "cookies": cookies,
        "connection_type": connection_type,
        "approx_packet_size": approx_size
    }), 200

@app.route('/', methods=['POST'])
def post_handler():
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
    timestamp = datetime.now().isoformat()

    # HTTP version
    http_version = request.environ.get('SERVER_PROTOCOL')

    # Host or domain name
    host_header = request.headers.get("Host")

    # User agent
    user_agent = request.headers.get("User-Agent")

    # Accept header
    accept_header = request.headers.get("Accept")

    # Referer
    referer = request.headers.get("Referer")

    # Cookies
    cookies = request.cookies

    # Connection type
    connection_type = request.headers.get("Connection")

    # Content length and approximate size
    content_length = request.content_length
    approx_size = len(str(request.headers)) + (content_length or 0)

    return jsonify({
        "client_ip": client_ip,
        "destination_ip": server_ip,
        "source_port": source_port,
        "server_port": server_port,
        "timestamp": timestamp,
        "method": "POST",
        "http_version": http_version,
        "host_name": host_header,
        "user_agent": user_agent,
        "accept_header": accept_header,
        "referer": referer,
        "cookies": cookies,
        "connection_type": connection_type,
        "approx_packet_size": approx_size
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
