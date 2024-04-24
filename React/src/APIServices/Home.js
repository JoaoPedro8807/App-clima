import URLS from "../constantes"

export default async function GetHome(){
    try{       
        const res = await fetch(URLS.base, {
            method: 'GET',
      
        }).then(r =>  r.json())
            .then(function format(e){
                return{
                    dados: e,
                    h_format: horaDefault(e.date_set) //retornando objeto com a hora/data formatada 
                    }
        })
        return res
    
    }catch(e){
        console.log('erro ao dar primiero request', e)
        return {name: null, state: ''}
    }
}   

function horaDefault(date){
    let data_s = date
    let d = new Date(data_s)     

    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds().toString().padStart(2, '0')}`
}