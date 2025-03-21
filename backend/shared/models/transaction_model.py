from datetime import datetime
from shared.utils.db_utils import db
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship

class Transaction(db.Model):
    __tablename__ = 'transactions'

    transaction_id = Column(Integer, primary_key=True, autoincrement=True)  # Unique transaction ID
    transaction_date = Column(DateTime, default=datetime.utcnow, nullable=False)  # Date of the transaction
    transaction_amount = Column(Float, nullable=False)  # Amount of the transaction
    transaction_channel = Column(String(50), nullable=False)  # Like, web, mobile
    transaction_payment_mode = Column(String(50), nullable=False)  # Card, UPI, NEFT, etc.
    payment_gateway_bank = Column(String(50), nullable=False)  # Service Bank
    payer_email = Column(String(100), nullable=False)  # Sender email
    payer_mobile = Column(String(15), nullable=False)  # Sender mobile
    payer_card_brand = Column(String(50), nullable=True)  # Sender Card brand (Optional)
    payer_device = Column(String(100), nullable=True)  # Device ID (Optional)
    payer_browser = Column(String(100), nullable=True)  # Web browser used (Optional)
    payee_id = Column(String(50), nullable=False)  # Unique payee ID



