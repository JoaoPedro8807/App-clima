from flask_jwt_extended import JWTManager

jwt = JWTManager()

def init_jwt_menager(app):
    jwt.init_app(app)
