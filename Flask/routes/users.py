from flask import request, jsonify, request, make_response
from services.user_services.get_users import get_all_users
from decorators.decorator_login import login_required
from decorators.decorator_admin import admin_required


import json

def init_routes_users(app):
    @app.route('/users/<int:page>', methods=['GET'])
    @login_required
    def get_users(page):
        if request.method == 'GET':
            try:
                users, exception = get_all_users(page, 7)
                if exception:
                    return make_response(jsonify(
                        {"error": f'Erro ao pegar a lista de usuários: {str(exception)}'}
                    ), 500)
                print(users)
                return make_response(
                    jsonify(users),
                    200, {'Content-Type': 'application/json'})

            except Exception as e:
                return make_response(jsonify(
                    {"error": str(e)}), 500)






















