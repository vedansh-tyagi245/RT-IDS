from flask import Flask, request, jsonify
from flask_cors import CORS
import socket

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_handler():
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    
    if x_forwarded_for:
        ip_list = [ip.strip() for ip in x_forwarded_for.split(',')]
        # Safely get 3rd last IP
        if len(ip_list) >= 3:
            client_ip = ip_list[-3]
        else:
            client_ip = ip_list[0]  # fallback to first
    else:
        client_ip = request.remote_addr  # fallback if no header

    server_ip = socket.gethostbyname(socket.gethostname())
    
    return jsonify({"message": f"Hello World from {client_ip}", "destination_ip": server_ip}), 200

@app.route('/', methods=['POST'])
def post_handler():
    return jsonify({"message": "Tello World"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
