from shared.models.transaction_model import Transaction
from shared.utils.db_utils import db
from datetime import datetime

class TransactionServices:
    
    @staticmethod
    def add_transaction(data):
        try:
            transaction_date = data.get('transaction_date', datetime.utcnow()) 
            transaction_amount = data.get('transaction_amount')
            transaction_channel = data.get('transaction_channel')
            transaction_payment_mode = data.get('transaction_payment_mode')
            payment_gateway_bank = data.get('payment_gateway_bank')
            payer_email = data.get('payer_email')
            payer_mobile = data.get('payer_mobile')
            payer_card_brand = data.get('payer_card_brand')
            payer_device = data.get('payer_device')
            payer_browser = data.get('payer_browser')
            payee_id = data.get('payee_id')

            if not transaction_amount or not transaction_channel or not transaction_payment_mode or not payment_gateway_bank \
                or not payer_email or not payer_mobile or not payee_id:
                return {"error": "Missing required fields"}, 400

            new_transaction = Transaction(
                transaction_date=transaction_date,
                transaction_amount=transaction_amount,
                transaction_channel=transaction_channel,
                transaction_payment_mode=transaction_payment_mode,
                payment_gateway_bank=payment_gateway_bank,
                payer_email=payer_email,
                payer_mobile=payer_mobile,
                payer_card_brand=payer_card_brand,
                payer_device=payer_device,
                payer_browser=payer_browser,
                payee_id=payee_id
            )

            db.session.add(new_transaction)
            db.session.commit()

            return new_transaction,True

        except Exception as e:
            db.session.rollback()
            return str(e), False
