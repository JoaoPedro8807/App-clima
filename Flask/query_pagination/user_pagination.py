from models.users import Users

def pagination(page: int, per_page: int) -> dict:
    try:
        pages = Users.query.paginate(page=page, per_page=per_page)

        return {
            'total': pages.total,
            'pages': pages.pages,
            'has_prev': pages.has_prev,
            'has_next': pages.has_next,
            'results': pages.items

        }

    except Exception as e:
        print('Erro pagination: ', e)
        return None

