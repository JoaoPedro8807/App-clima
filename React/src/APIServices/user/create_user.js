import URLS from "../../constantes";

const createUser = async (event) =>{
    const dataForm = new FormData(event.target) //event.target = form
    

    if(!dataForm) return 
    try{
        const response = await fetch(URLS.create_users,{
            method: 'POST',
            body: dataForm
        })

        const data = await response.json()

        if(!response.ok){
            return [response.status, data.error] //tratamento de erro vai ser no componente, para exibira msg de erro lá.
        }
        return [response.status, data]

    }catch(e){
        console.log(e)
        return e
    }
}

export default createUser