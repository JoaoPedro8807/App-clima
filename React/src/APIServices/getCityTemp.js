import URLS from "../constantes";
import current_jwt_token from "./current_jwt_token";

export default async function getCityTemp(id_city, event){
    if(!id_city) return
    try{
        const token = current_jwt_token()
        const response =  await fetch(`${URLS.temp_cidade}?id_city=${id_city}`,
        {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        if(response.status !== 200){    
            console.log(data)
            return [response.status, data.error]
        }
        return [response.status, data]
        
    }catch(e){
        console.log('Erro ao pegar a os dados da cidade: ', e)
        return e
    }
    
}

