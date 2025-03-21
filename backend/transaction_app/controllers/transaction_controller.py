from datetime import datetime
from transaction_app.services.transaction_service import TransactionServices
from transaction_app.views.transaction_view import TransactionView

class TransactionController:
    @staticmethod
    def add_transaction(data):
        transaction,isdone = TransactionServices.add_transaction(data)
        if isdone:
            return TransactionView.render_transaction_detail(transaction)
        else:
            return TransactionView.render_error(transaction)
        
    
