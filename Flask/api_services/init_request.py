import httpx
from api_services import API_KEY
from asyncio import gather, run

async def home(client: httpx.AsyncClient):

    #pegando o id da cidade padrão
    resp_id = await client.get(f'/api-manager/user-token/{API_KEY}/locales')
    id = resp_id.json()['locales'][0]

    #pegando cidade já com o id
    response_cidade = await client.get(f"/api/v1/locale/city/{id}?token={API_KEY}")
    cidade = response_cidade.json()


async def main():
    #intanciando apenas um client do httpx para ser usado em todas as tasks
    with httpx.AsyncClient(base_url='http://apiadvisor.climatempo.com.br') as client:
        final = gather(
            *[home(client)]
        )
        await final
        return final

run(main())


