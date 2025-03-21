from flask import Blueprint, request
from transaction_app.controllers.transaction_controller import TransactionController


transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/add_transaction', methods=['POST'])
def add_transaction():
    data = request.json
    return TransactionController.add_transaction(data)
    
