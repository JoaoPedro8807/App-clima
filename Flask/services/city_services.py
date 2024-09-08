from models.city import City
from extensoes.configuration_db import db
from datetime import datetime
from api_services import API_KEY
import httpx
def put_default_city(new_id: int, new_name: str, new_state: str) -> City | dict:
    with httpx.Client() as client:


    #if response.status_code == 200:
        try:
            _city = get_default_city()
            _city.id_city = new_id
            _city.name = new_name
            _city.state = new_state
            _city.date_set = datetime.now()
            db.session.add(_city)
            db.session.commit()
            return 'ok', _city

        except Exception as e:
            db.session.rollback()
            return {
                "error": str(e)
            }
def get_default_city():
    return City.query.filter_by(id=1).first()

def get_object_city():
    try:
        _c = City.query.filter_by(id=1).first()
        return {
            'id_city': _c.id_city,
            'name': _c.name,
            'state': _c.state,
            'date_set': _c.date_set
        }
    except Exception as e:
        print(e)
        return None





