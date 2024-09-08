from flask import jsonify, request, render_template
from services import city_services
import json
from decorators.decorator_login import login_required

def init_rotas_home(app):

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def catch_all(path):
        return render_template('index.html')


    @app.route('/api')
    def api():
        if request.method == 'GET':
            try:
                cidade_default = city_services.get_object_city()
                print(cidade_default, type(cidade_default))
                return jsonify(cidade_default)

            except Exception as e:
                print('error:', e)
                return jsonify({'error': str(e)})


