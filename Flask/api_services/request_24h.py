import httpx
from api_services import API_KEY
from models.city import City

def get_temp_24h():
    try:
        id = City.get_city_default().id_city
    except Exception as err:
        return 'Erro no query da Cidade padrão: ', err

    _httpx_timeout = httpx.Timeout(5.0, read=5.0)
    with httpx.Client(timeout=_httpx_timeout) as client:
        try:
            response = client.get(f'http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/{id}/hours/72?token={(API_KEY)}')
            response.raise_for_status()
            res_json = response.json()
            city = {
                'name': res_json['name'],
                'state': res_json['state'],
                'country': res_json['country'],
            }
            horarios = res_json['data'][:25]
            return city, horarios, None

        except httpx.HTTPError as err:
            print('Erro no request 24_city', str(err))
            return None, None,  {str(err)}