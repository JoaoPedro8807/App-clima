from extensoes.configuration_db import db
from models.users import Users

def delete(id):
    user = Users.query.filter_by(id=id).first()
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return 200, f'Usuário {user.nome} deletado com sucesso!'

        except Exception as e:
            db.session.rollback()
            return 400, f'Erro ao deletar usuário: {e.__str__()}'

    else:
        return 404, f'Nenhum usuário encontrado!'