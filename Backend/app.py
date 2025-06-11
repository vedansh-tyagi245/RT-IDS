from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_handler():
    # Get the client IP from X-Forwarded-For header or fall back to remote_addr
    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    
    return f'Hello World from {client_ip}'

@app.route('/', methods=['POST'])
def post_handler():
    return 'Tello World'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')