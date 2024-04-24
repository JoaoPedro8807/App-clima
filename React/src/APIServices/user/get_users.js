import URLS from "../../constantes"
import current_jwt_token from "../current_jwt_token"

export default async function getUser(page){
    const token = current_jwt_token()

    try{
        const response = await fetch(
            `${URLS.get_users}/${page}`,{
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${token}`
                }   
            })
            const data = await response.json()  
            if(!response.ok){
                return [response.status, data.error]
            } 
            return  [response.status, data]
        }

    catch(e){
        console.log(e)
        return e
    }
}
