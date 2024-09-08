from flask_jwt_extended import create_access_token
from datetime import timedelta

def create_jwt(identity: int, hours: int, admin: bool):
    try:
        access_token = create_access_token(
            identity=identity,
            expires_delta=timedelta(
                hours=hours),
            additional_claims={"roles": "administrador"} if admin else None
        )
        return access_token

    except Exception as e:
        print(e)
        return {'Erro ao criar o token': str(e)}
