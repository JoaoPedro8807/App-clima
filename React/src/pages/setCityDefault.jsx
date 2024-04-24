import { useState } from "react"
import './setCityDefault.css'
import renderForm from "../components/appComponents/RenderForm"
import getCitys from "../APIServices/foundCitys" 
import TableCityDefault from "../components/appComponents/TableCityDefault"
export default function SetDefaultCity(){

    const [formValue, setFormValue] = useState()
    const [cityFound, setCityFound] = useState([])
    console.log(formValue)
    console.log(cityFound)

    return(
        <div className="content">
            <div className="content-container">
                {renderForm({
                    formClasses: 'city-default-form',
                    name: 'city-default',
                    locale: 'Digite a cidade que deseja definir como padrão ',
                    cb(resp){
                        setFormValue(resp.target.value)
                    },
                    click(){
                        formValue ?
                        getCitys({city_name: formValue})    
                            .then(citys => setCityFound(citys))
                        : alert('Digite algo antes')                        
                    }
                })}
                <div className="default-result">                                           
                    {cityFound.length > 0 && <TableCityDefault cityFound={cityFound} />}
                </div>
            </div>
        </div>
    )
}
