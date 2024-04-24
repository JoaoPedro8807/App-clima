import httpx
import json
from api_services import API_KEY

def temp_city(id_city):
    with httpx.Client(base_url='http://apiadvisor.climatempo.com.br/api/v1/weather/locale') as client:
        try:
            r = client.get(f'/{str(id_city)}/current?token={API_KEY}')
            r.raise_for_status()
            return r.json(), None

        except httpx.HTTPError as exc:
            return None, str(exc.response.text)
        #Não levantei uma exceção para buscar só a cidade padrão, acaso não houver mais essa restrição, ficará a exceção da API externa


    return r.status_code, r.json()



                       
