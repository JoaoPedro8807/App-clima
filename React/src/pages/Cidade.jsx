import React, { useState, useEffect} from 'react'
import RenderForm from '../components/appComponents/RenderForm'
import './Cidade.css'
import getCitys from '../APIServices/foundCitys'
import RenderError  from '../funcionalidades/cidade'
import RenderTableCity from '../components/appComponents/RenderTableCity'
import RenderTemp from '../components/appComponents/RenderTemp'

export default function Cidade(){

    const [formValue, setFormValue] = useState('')
    const [tempCity, setTempCity] = useState('')
    const [cityFound, setCityFound] = useState([])

    const tableResult = document.querySelector('.city-results')

    const showListCity =  () => {
        tableResult.childNodes.forEach((e => e.classList.add('hide')))
    }

 //limpando a lista de busca
    const removeListCity = () => {
        tableResult.childNodes.forEach((e => e.classList.remove('hide'))) 
    }

    function handleRenderTable(err){
        cityFound.length > 0 && tableResult ?
        removeListCity() : console.log('Erro na renderização da tabela')
       return(
            cityFound && <RenderTableCity list={cityFound} setTempCity={setTempCity}  />
       )
    }
    
    function handleRenderTemp(){
        tableResult !== undefined ? // limpando a lista de busca de cidades para exibir o clima
        showListCity() : console.log('Erro na renderização da temperatura')
        const tempData = tempCity.data
        return(
            <RenderTemp tempData={tempData} tempCity={tempCity} />
        )
    }

    return (
        <div className="content city-container d-flex flex-column align-items-center mt-5">
            {RenderForm({
                locale: 'cidade',
                formClasses: "city-form",
                name: 'city_input',
                cb(e){ 
                    setFormValue(e.target.value)
                },
                click(){ //send
                    setTempCity() //limpando a div para colocar outro result
                    formValue ?
                    getCitys({city_name: formValue})
                        .then(citys => citys[0] === 200 ? setCityFound(citys[1]) : RenderError(citys[1], 'header', 'afterbegin'))   
                    : RenderError('Campo da cidade vazio!', 'header')
                }
            })}
            {cityFound.length > 0 && handleRenderTable()}
            {tempCity && handleRenderTemp()  }
        </div>
    )
}   