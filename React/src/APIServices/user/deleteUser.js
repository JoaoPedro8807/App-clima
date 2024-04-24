import URLS from "../../constantes"
import current_jwt_token from "../current_jwt_token"


const deleteUser =  async function(user){
    try{
        const token = current_jwt_token()
        const response = await fetch(
            `${URLS.del_users}/${user.id}`,
            {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        const data = await response.json()

        if(!response.ok){
            let errorMsg = "Ocorreu algum erro ao deletar o usuário no servidor."
            if(data.error){
                errorMsg = data.error} // caso não a requisição não chege no flask, a mensagem será essa genérica
            
            return [response.status, errorMsg]
        }

        return [response.status, data.message]
 
    }catch(e){
        console.log(e)       
        return e
    }
}

export default deleteUser