from flask import jsonify

class TransactionView:
    @staticmethod
    def render_transaction_detail(transaction_data):
        return jsonify({
            "status": "success",
            "data": {
                "transaction_id": transaction_data.transaction_id,
                "transaction_date": transaction_data.transaction_date,
                "transaction_amount": transaction_data.transaction_amount,
                "transaction_channel": transaction_data.transaction_channel,
                "transaction_payment_mode": transaction_data.transaction_payment_mode,
                "payment_gateway_bank": transaction_data.payment_gateway_bank,
                "payer_email": transaction_data.payer_email,
                "payer_mobile": transaction_data.payer_mobile,
                "payer_card_brand": transaction_data.payer_card_brand,
                "payer_device": transaction_data.payer_device,
                "payer_browser": transaction_data.payer_browser,
                "payee_id": transaction_data.payee_id
            }
        }), 200

    @staticmethod
    def render_error(error_message, status_code=500):
        return jsonify({
            "status": "error",
            "message": error_message
        }), status_code
