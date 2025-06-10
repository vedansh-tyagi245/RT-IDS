from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_requests():
    if request.method == 'GET':
        return 'Hello World'
    elif request.method == 'POST':
        return 'Tello World'
    else:
        return 'Method Not Allowed', 405

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')