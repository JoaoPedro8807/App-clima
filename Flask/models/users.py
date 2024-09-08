from extensoes.configuration_db import db
from datetime import datetime
from passlib.hash import pbkdf2_sha256 as cript




class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    create_at = db.Column(db.DateTime(timezone=False), default=datetime.now().strftime('%d%m%Y %H:%M:%S'), nullable=True)

    roles = db.relationship('Role', secondary='user_roles',  back_populates='users')

    def __init__(self, nome, email, password):
        self.nome = nome
        self.email = email
        self.password = password
        self.create_at = datetime.now()

    def __repr__(self):
        return f'User: {self.nome}, {self.email}, {self.password}'

    def is_admin(self):
        return bool(
            Role.query
            .join(Role.users)
            .filter(Users.id == self.id)
            .filter(Role.id == 1)
            .count() == 1
        )

    def criptografar_senha(self):
        self.password = cript.hash(self.password)

    def verify_senha(self, senha):
        return cript.verify(senha, self.password)

    @classmethod
    def find_by_email(cls, email):
        return Users.query.filter_by(email=email).first() #email contém contraint unique, então pegamos apenas o primeiro


class Role(db.Model):
    __tablename__ = 'role'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    slug = db.Column(db.String(50), nullable=True, unique=True)

    users = db.relationship('Users', secondary='user_roles', back_populates='roles')

    def __init__(self, name, slug):
        self.name = name
        self.slug = slug

    def __repr__(self):
        return f'Role: {self.name}, {self.slug}'



class UserRole(db.Model):
    __tablename__ = 'user_roles'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), primary_key=True)


    def __init__(self, user_id, role_id):
        self.user_id = user_id
        self.role_id = role_id

    def __repr__(self):
        return f'User com id: {self.user_id}, contém role id: {self.role_id}'

