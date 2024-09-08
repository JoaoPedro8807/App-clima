from models.users import Users

def verify_login(user_email: str, user_password: str) -> bool | Users:
    user = Users.query.filter_by(email=user_email).first()
    if not user or not user.verify_senha(senha=user_password):
        return False
    return user


