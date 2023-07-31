from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from xkcdGPT import generate_response

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://master.dkkptgj34gag4.amplifyapp.com"}})

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat_endpoint():
    if request.method == 'OPTIONS':
        response = make_response()
        return add_cors_headers(response)
    
    data = request.get_json()
    user_input = data['message']
    print(user_input)

    # do something with user_input
    response = generate_response(user_input)
    print(response)

    return jsonify(response=response)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow any origin
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    return response

@app.after_request
def after_request(response):
    return add_cors_headers(response)

@app.errorhandler(500)
def handle_500_error(error):
    response = {
        'status': 500,
        "error": "Internal Server Error",
        'messages': str(error)
    }
    return jsonify(response), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
