from extensoes.configuration_db import db

class City(db.Model):
    __tablename__ = 'city'

    def __init__(self, id_city, date_set, name: str, state: str) -> None:
        self.id_city = id_city
        self.date_set = date_set
        self.name = name
        self.state = state

    def __repr__(self) -> str:
        return f'City {self.name}: id: {self.id_city}, date_set: {self.date_set}, state: {self.state}'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_city = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    date_set = db.Column(db.DateTime(timezone=False), nullable=False)



    @classmethod
    def get_city_default(cls):
        return City.query.filter_by(id=1).first()

