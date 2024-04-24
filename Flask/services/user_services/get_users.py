from models.users import Users
from query_pagination import user_pagination
def get_all_users(page: int, per_page: int):
    #Retorna 3 dados:
    # lista de user caso a Query dê certo,
    # Exception e msg do Exception caso ocorra algum erro na Query
    try:
        users_list = user_pagination.pagination(
            page=page,
            per_page=per_page
        )
        if not users_list:
            return [], None

        users = [
            {"name": user.nome, "email": user.email, "create_at": user.create_at, "id": user.id}
            for user in users_list['results']
        ]
        users_list['results'] = users
        return users_list, None


    except Exception as err:
        print(str(err))
        return None, err