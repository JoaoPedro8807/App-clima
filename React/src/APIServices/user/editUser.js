import URLS from "../../constantes"
import current_jwt_token from "../current_jwt_token"

export default async function editUser(formEvent, user){
    formEvent.preventDefault()
    const credenc = formEvent.target
    const formData = new URLSearchParams()
    const token = current_jwt_token()

    for (const pair of new FormData(credenc)){ //formData com os tres inputs (nome, email, admin) do form
        formData.append(pair[0], pair[1]) 
    }
    
    if(!formData) return
    
    try{
        const response = await fetch(`${URLS.edit_users}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        })
        const data = await response.json()
        
        return {
            response,
            data
        }

    }catch(e){
        console.log(e)
        return e
        }

}



                                                          

