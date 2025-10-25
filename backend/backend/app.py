from flask import Flask
from flask_cors import CORS
from routes.producer_routes import producer_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(producer_bp, url_prefix="/producer")

if __name__ == "__main__":
    app.run(debug=True)
