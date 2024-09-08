from api_services import API_KEY
from extensoes.configuration_db import db
from models.city import City
import httpx

def set_defaut(id):
    with httpx.Client() as client:
        try:
            data = f'localeId[]={str(id).strip()}'
            headders = {'Contet-Type': 'application/x-www-form-urlencoded'}
            response = client.put(f'http://apiadvisor.climatempo.com.br/api-manager/user-token/{API_KEY}/locales',  data=data, headers=headders)
            response.raise_for_status()


        except httpx.HTTPError as exce:
            return exce.response.status_code, exce.response.text

    if response.status_code == 200:
        try:
            bd_city = City.query.filter_by(id=1).first()
            return bd_city
        except Exception as e:
            print('error: ', e)

