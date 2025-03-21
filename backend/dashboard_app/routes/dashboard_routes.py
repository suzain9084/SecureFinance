from flask import Blueprint, request
from shared.utils.db_utils import db
from dashboard_app.controller.dashboard_controller import DashboardController


dashboard_bp = Blueprint('dashboard', __name__)
