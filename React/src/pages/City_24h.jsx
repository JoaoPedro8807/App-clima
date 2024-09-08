import { useEffect, useState } from "react"
import './City_24h.css'
import get24H from "../APIServices/get24H";
import Pagination from "../components/appComponents/RenderPagination";
import RenderError  from '../funcionalidades/cidade'


export default function City_24h(props){

    const [horarios, setHorarios] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        get24H().then(r => {
            setIsLoading(false)            
            if(r[0] !== 200){
                RenderError(r[1], 'city24h-container')  //tentar colocar o renderError como reactComponent
            }else{
                setHorarios(r[1]) //caso dê certo, o state receberá apenas os dados sem o status
            }
        })
    }, [])
        
    return(
        <div className="content">
            <div className="city24h-container">
                {isLoading ? 
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : 
                horarios && <Pagination  city={horarios[0]}  horarios={horarios[1]} />
                }
           
            </div>
        </div>   
    )
}