import json
import httpx
from api_services import API_KEY

def find_id_city(city_name):
    _httpx_timeout = httpx.Timeout(timeout=10.0, read=10.0)
    with httpx.Client(base_url='http://apiadvisor.climatempo.com.br/api/v1/locale',
                      timeout=_httpx_timeout) as client:
        try:
            response = client.get(f'/city?name={str(city_name).strip()}&state=SP&token={API_KEY}')
            response.raise_for_status()
            r = json.loads(response.text)
            if len(r) < 1:
                return None,  f'Não foi econtrado nenhuma cidade com o nome {city_name}'
            citys_list = []
            for city in r:
                citys_list.append({
                    "id": city['id'],
                    "nome": city['name'],
                    "estado": city['state']
                })
            return citys_list, None

        except httpx.HTTPError as err:
            return None, err

