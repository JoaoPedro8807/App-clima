from extensoes.configuration_db import db
from models.users import Users, UserRole
from sqlalchemy.exc import IntegrityError
import re

def validate_user_name(username: str) -> bool:
    rgx_user_name = r"^[a-zA-Z0-9._-]{3,20}$"
    return bool(re.match(rgx_user_name, username))

def validate_email(email: str) -> bool:
    rgx_email = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(rgx_email, email))

def validate_password(password: str) -> bool:
    rgx_pass = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"
    return bool(re.match(rgx_pass, password))

def validar_create(name: str, email: str, password: str) -> bool:
    return validate_user_name(name) and validate_email(email) and validate_password(password)

def create(username: str, email: str, password: str, to_admin: bool) -> Users or None:

    if not validar_create(username, email, password):
        return None, "Campos passados são inválidos não condizem com o esperado."

    try:
        user_bd = Users(nome=username.strip(), email=email.strip(), password=password.strip())
        user_bd.criptografar_senha()
        db.session.add(user_bd)
        db.session.commit()

        user = {
            "id": user_bd.id,
            "nome": user_bd.nome,
            "email": user_bd.email,
            "created_at": user_bd.create_at
        }

        if user_bd and to_admin:  # adicionando na tabela normalizada de user/admin.
            try:
                admin = UserRole(user_id=user_bd.id, role_id=1)
                db.session.add(admin)
                db.session.commit()

            except Exception as e:
                db.session.rollback()
                print(str(e))
                return None, e

        return user, None





    except Exception as e:
        print(str(e))
        db.session.rollback()
        return None, e

