from functools import wraps
from flask_jwt_extended import verify_jwt_in_request
from flask import make_response, jsonify, request

def token_required(f):
    @wraps(f)
    def decorate_meu_login(*args, **kwargs):
        if not verify_jwt_in_request():
            return make_response(403,
                jsonify({'Não autorizado'})
            )
        return f(*args, **kwargs)
    return decorate_meu_login