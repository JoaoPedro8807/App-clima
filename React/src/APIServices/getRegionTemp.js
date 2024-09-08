import URLS from "../constantes";
import current_jwt_token from "./current_jwt_token";

export default async function getRegionTemp(regionName){
    if(!regionName) return      
    try{
        const token = current_jwt_token()
        const response  = await fetch(URLS.temp_regiao, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(regionName)
        })                                                                                  
        const data = await response.json()

        if(!response.ok){
            return [response.status, data.error]
        }
        return [response.status, data]

    }catch(e){
        console.log('Erro ao pegar os dados da região', e)
        return e
    }
}