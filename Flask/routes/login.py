from flask import request, jsonify, make_response
from services.user_services import user_login
from services.user_services.create_jwt_token import create_jwt
def init_rotas_login(app):
    @app.route('/login', methods=['POST'])
    def login():
        if request.method == 'POST':
            try:
                email = str(request.form['inputEmail']).strip()
                password = str(request.form['inputPass']).strip()

                user_query = user_login.verify_login(user_email=email, user_password=password)
                #verifica as credenciais de login, retorna o objeto do user caso esteja correto, se não, retorna False
                if user_query:
                    token = create_jwt(
                        identity=user_query.id,
                        hours=1,
                        admin=user_query.is_admin()
                    )
                    user = {
                        'id': user_query.id,
                        'email': user_query.email,
                        'name': user_query.nome,
                        'create_at': user_query.create_at,
                        'jwt_token': token
                    }
                    return make_response(jsonify(
                        user),
                        200
                    )
                return make_response(jsonify({
                    "error": "Email ou senham estão incorretos, tente novamente"
                    }),
                    400
                )
            except Exception as e:
                return make_response(jsonify({
                    "error": "Erro ao validar o login, tente novamente"
                }),
                    402
                )
