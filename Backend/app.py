from flask import Flask, request, jsonify
from flask_cors import CORS
import socket

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

    return jsonify({
        "message": f"Hello World from {client_ip}",
        "destination_ip": server_ip,
        "source_port": source_port,
        "server_port": server_port
    }), 200

@app.route('/', methods=['POST'])
def post_handler():
    return jsonify({"message": "Tello World"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
