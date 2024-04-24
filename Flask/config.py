import os

SQLALCHEMY_DATABASE_URI = "sqlite:///clima-sqlite.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
CORS_HEADERS = 'Content-Type'
SECRET_KEY = 'clima'
JWT_SECRET_KEY = 'clima'

#instalar corretamente o dotenv, e pegar as variaveis de ambiente (.env), para serem os valores das variaveis de config da APP