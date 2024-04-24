import URLS from "../constantes";
import current_jwt from "./current_jwt_token";

export default async function get24H(){
    try{
        const token = current_jwt()
        const response = await fetch(URLS.get24h,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        const data = await response.json()
        if(!response.ok){
            return [response.status, data.error]
        }
        return [response.status, data]

    }catch(e){
        console.log('Erro ao pegar os dados da cidade: ', e)
        return e
    }
}
