from flask import jsonify, request, abort, make_response
from services.user_services.user_crud import create_user, delete_user, update_user
from decorators.decorator_admin import admin_required


def init_rotas_crud(app):
    @app.route('/create_user', methods=['POST'])
    def new_user():
        if request.method == 'POST':
            try:
                _nome = str(request.form.get('register_name')).strip()
                _email = str(request.form.get('register_email')).strip()
                _senha = str(request.form.get('register_senha')).strip()
                _admin = bool(request.form.get('register_admin'))

                user, exception = create_user.create(_nome, _email, _senha, _admin)

                if exception:
                    return make_response(jsonify(
                        {"error": f"Erro ao criar um novo usuário: {str(exception)}"}),
                        500)

                return make_response(jsonify(
                    user),
                    200)

            except Exception as e:
                return make_response(jsonify(
                    {"error": f"Erro: {str(e)}"}
                ))


    @app.route('/delete_user/<int:id>', methods=['DELETE'])
    @admin_required
    def del_user(id):
        if request.method == 'DELETE' and id:
            _u = delete_user.delete(id)
            return jsonify(_u)


    @app.route('/edit_user/<int:id>', methods=['PUT'])
    @admin_required
    def edit_user(id):
        if request.method == 'PUT' and id:
            try:
                nome = request.form.get('inputNewName')
                email = request.form.get('inputNewEmail')
                is_admin = request.form.get('inputNewAdmin', False)

                new_user = {
                    "nome": nome,
                    "email": email,
                    "admin": is_admin
                }
                user_update, exception = update_user.update(user_id=id, new_user=new_user)
                if exception:
                    return make_response(
                        jsonify({
                            "error": str(exception)
                        }),
                        500
                    )

                return make_response(
                    jsonify(user_update), 200)

            except KeyError as e:
                return make_response(jsonify({
                    "error": f'erro ao pegar usuario do form: {str(e)}'
                }),
                    500)

            except Exception as e:
                return make_response(jsonify({
                    "error":    f'erro ao atualizar o usario: {str(e)}, {e}'
                }),
                    405)












