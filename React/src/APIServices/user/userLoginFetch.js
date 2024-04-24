import URLS from "../../constantes"
import RenderError from "../../funcionalidades/cidade"

async function fetchLogin(e){
    e.preventDefault()
    const form = e.target
    const credenc = new FormData(form)

    if(!credenc) return

    try{
        const response =  await fetch(URLS.login,{
            method: 'POST',
            body: credenc
        })
        const data = await response.json()
        
        if(!response.ok){
            return [response.status, data.error]
        }
        return [response.status, data]

    }catch(e){
        console.log('erro no request: ', e)
        return e
    }
}   

export default fetchLogin