from extensoes.configuration_db import db
from models.users import UserRole

def set_admin(user_id):
    if user_id is None:
        return False
    try:
        user_role = UserRole(user_id=user_id, role_id=1)
        db.session.add(user_role)
        db.session.commit()
        return user_role

    except Exception as e:
        db.session.rollback()
        print(e.__repr__())
        return False