from extensoes.configuration_db import db
from models.users import Users
from services.user_services.set_admin import set_admin

def update(user_id: int, new_user: dict):
    if user_id:
        try:
            user = Users.query.filter_by(id=user_id).update({
                "nome": new_user["nome"],
                "email": new_user["email"]
            })

            if new_user['admin']:   #Tabela de yserRoles tanto user_id  e role_id são PK,
                # #e levantará um exception caso repita, então não precisa testar se o user já é admin aqui
                set_admin(user_id)
            db.session.commit()
            return f'Usuário {new_user["nome"]} alterado com sucesso! ', None

        except Exception as e:
            print(e)
            db.session.rollback()
            return None, e



