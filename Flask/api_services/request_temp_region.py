import httpx
from api_services import API_KEY

def search_region(region_name):
    with httpx.Client(base_url='http://apiadvisor.climatempo.com.br/api/v1/forecast/region') as client:
        try:
            res = client.get(f'/{str(region_name).title().strip()}?token={API_KEY}')
            res.raise_for_status()
            return res.json(), None

        except httpx.HTTPError as err:
            return None, err









