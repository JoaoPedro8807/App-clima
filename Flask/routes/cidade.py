from flask import request, jsonify, json, jsonify, make_response
from api_services.request_city import find_id_city
from api_services.request_temp_city import temp_city
from services.city_services import put_default_city
from api_services.request_24h import get_temp_24h
from decorators.decorator_login import login_required
def init_rotas_cidade(app) -> None:
    @app.route('/get_city', methods=['POST', 'GET'])
    def get_city():
        if request.method == 'POST':
            try:
                city_name = str(request.get_json().get('city_name')).lower()
                response, exception = find_id_city(city_name)
                if exception:
                    return make_response(
                        jsonify({
                            "error": f'Erro ao requisitar as cidades: {str(exception)}'
                        }),
                        400
                    )
                return jsonify(response)

            except Exception as e:
                return make_response(
                    jsonify({
                        "error": {str(e)}
                    }),
                    500
                )

    @app.route('/get_temp', methods=['GET'])
    @login_required
    def get_temp():
        if request.method == 'GET':
            try:
                id = request.args.get('id_city')
                if not id:
                    return make_response(
                        jsonify("Erro ao obter a temperatura"))

                response, exception = temp_city(id)
                if exception:
                    return make_response(
                        jsonify({
                            "error": f'Erro ao obter os dados da cidade: {str(exception)}'
                        }),
                        400
                    )
                return jsonify(response)

            except Exception as e:
                return make_response(
                    jsonify(
                        {"error": str(e)}
                    ),
                    500
                )

    @app.route('/set_default', methods=['PUT', 'POST'])
    @login_required
    def set_default():
        if request.method == 'POST':
            city = request.get_json().get('city_obj')
            r = put_default_city(city['id'], city['name'], city['state'])
            return jsonify(r)

    @app.route('/get_24h', methods=['GET'])
    @login_required
    def get_24h():
        if request.method == 'GET':
            citys, horarios, exception = get_temp_24h()
            if exception:
                return make_response(
                    jsonify({
                        "error": f'Erro ao obter os horários da cidade padrão: {exception}'}),
                    400
                )
            return make_response(
                jsonify([citys, horarios]),
                200
            )



