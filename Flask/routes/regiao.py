from flask import request,jsonify, make_response
from api_services import request_temp_region
from decorators.decorator_login import login_required
import json

def init_rotas_regiao(app):
    @app.route('/get_regiao', methods=['POST'])
    @login_required
    def regiao():
        if request.method == 'POST':
            try:
                region = request.get_json().get('region_name')
                if not region:
                    return make_response(jsonify({
                        "error": f"Não foi possível obter o nome da região"
                    }),
                        500
                    )

                response, exception = request_temp_region.search_region(str(region))
                if exception:
                    return make_response(jsonify({
                        "error": f"Erro ao obter os dados da região: {str(exception)}"
                    }),
                        400
                    )
                return make_response(jsonify(
                    response),
                    200
                )

            except Exception as e:
                return make_response(jsonify({
                    "error": f"Erro ao obter os dados da região: {str(e)}"
                    }),
                    500
                )


