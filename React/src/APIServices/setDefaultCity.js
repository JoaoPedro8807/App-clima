import URLS from "../constantes"


async function setDefaultCity(city){
    try{
       const response = await fetch(URLS.setDefault,{
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({city_obj: city})
        }).then(resp => resp.json())
        return response  
        
    }catch(e){
        console.log('Erro ao definir uma nova cidade padrão', e)
        return e
    }
}

export default setDefaultCity