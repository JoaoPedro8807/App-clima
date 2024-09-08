import URLS from "../constantes";
import current_jwt_token from "./current_jwt_token";

export default async function getCitys(name){
    if(!name) return

    try{
        const token = current_jwt_token()
        const response = await fetch(URLS.cidade, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(name)
        })
        const data = await response.json()
        if(!response.ok){
            return [response.status, data.error]
        }
        return [response.status, data]

    }catch(e){
        console.log('erro ao pesquisar cidades: ', e)
        return e
    }
}
