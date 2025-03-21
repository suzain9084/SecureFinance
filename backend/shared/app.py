from flask import Flask
from shared.utils.db_utils import db
from shared.utils.db_utils import migrate
from config.config import connection_string

# Initialize the Flask App
app = Flask(__name__)

# Initialization configuration
# (later move this configuration to config/config.py)
app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
migrate.init_app(app, db)


from shared.models.transaction_model import Transaction