from functools import wraps
from flask_jwt_extended import get_jwt, jwt_required, verify_jwt_in_request, current_user, decode_token
from flask import jsonify, make_response, request
from models.users import Users

def admin_required(f):
    @wraps(f)
    def decorate_meu_teste(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1] #pula o bearer
        if not token:
            return make_response(jsonify(
                {'message': 'Falta o token de autenticação.'}
            ), 403)
        try:
            token_object = decode_token(
                token)
            #garantindo que o token da requisição pertence ao meu APP e se o user é admin
            has_user = bool((
                Users.
                query.filter_by(id=token_object['sub'])
                .first()
                .is_admin())
            )

            if not has_user:
                return make_response(jsonify(
                    {'message': ' Você não tem permissão para acessar esse recurso'}
                ), 401)

            return f(*args, **kwargs)

        except Exception as e:
            print('Erro ao decodar', e)
            return make_response(jsonify(
                {'message': f'Erro ao Acessar o app: {str(e)} '}
            ))

    return decorate_meu_teste