from flask import Flask
from flask_cors import CORS
from extensoes import configuration_db, configuration_app, configuration_migrate, configuration_jwt
from routes import cidade, regiao, home, users, login, crud

app = Flask(__name__)

#app configuration
configuration_app.init_app(app)
configuration_db.init_db(app)
configuration_migrate.init_migrate(app)
configuration_jwt.init_jwt_menager(app)

CORS(app)#cors = CORS(app, resources={r"/cidade" : {"origins": "*"}})

#rotas configuration
cidade.init_rotas_cidade(app)
regiao.init_rotas_regiao(app)
users.init_routes_users(app)
login.init_rotas_login(app)
crud.init_rotas_crud(app)

home.init_rotas_home(app)


from models import users

if __name__ == '__main__':
    app.run(debug=True)
