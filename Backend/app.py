from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_handler():
    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    return jsonify({"message": f"Hello World from {client_ip}"}), 200

@app.route('/', methods=['POST'])
def post_handler():
    return jsonify({"message": "Tello World"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
