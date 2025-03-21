import sys, os
sys.path.append(os.getcwd())

from flask import Flask
from transaction_app.routes.transaction_routes import transaction_bp
from shared.utils.db_utils import db
from config.config import connection_string


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.init_app(app)

app.register_blueprint(transaction_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5001)