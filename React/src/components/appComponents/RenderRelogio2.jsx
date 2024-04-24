import { useState, useEffect} from "react";
import { Fragment } from "react";
console.log()

export default function RenderRelogio2(props){
    const [dif, setDif] = useState(new Date().getTime())

    if(!props.hora || props.hora === undefined){ //relógio zerado caso o return do Flask falhe
        return(        
            <Fragment>                                      
            <span className="timer-item">00</span>
            <span className="timer-separador">:</span>
            <span className="timer-item">00</span>                
            <span className="timer-separador">:</span>
            <span className="timer-item">00</span>
            </Fragment> 
        )
    }

    const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/) //rgx para relógio c/ 2 digitos cada casa
    const rg_exce = regex.exec(props.hora)    
    let time_format = rg_exce.filter((e, i)=> e != rg_exce[0]) //retirando o primeiro catch do regex (aonde vem a string inteira)
    
    let totalDifDate = new Date(dif).toISOString()
    let totalDifFormat = regex.exec(totalDifDate)
    let realTotalDif = totalDifFormat.filter(e =>  e != totalDifFormat[0]) 

    const itens = document.querySelectorAll('.timer-item') // depois de formatadas, inserindo as horas nos spans
    itens.forEach((e, i) => {
        e.innerHTML = realTotalDif[i]
    })

    let temporizador = setInterval(()=> {
        if (dif > 0){
            const agora = new Date()
            const dataAux = new Date()
            dataAux.setHours(time_format[0])
            dataAux.setMinutes(time_format[1])
            dataAux.setSeconds(time_format[2])
//pegando a data aux e tirando a dif do tempo atual, se a dif for 

            let totalDif = (dataAux.getTime() + 86400000) - agora.getTime() //a data que foi definida a cidade, + 24h - agora  = tempo restante (tudo em milisegundos)
            setDif(totalDif) //colocando no state o novo tempo restante, se for menor/igual a zero, limpar o temporaizador e chama a callback de relogóio terminado
        }else{
            clearInterval(temporizador)
            return props.CbFinish()
        }
    }, 1000)

    return(        
        <Fragment>
        <span className="timer-item"></span>
        <span className="timer-separador">:</span>
        <span className="timer-item"></span>
        <span className="timer-separador">:</span>
        <span className="timer-item"></span>
        </Fragment>
    )
    }
    