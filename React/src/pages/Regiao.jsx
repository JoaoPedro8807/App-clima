import React, {useState, useEffect} from 'react'
import './Regiao.css'
import getRegionTemp from '../APIServices/getRegionTemp'
import RenderForm from '../components/appComponents/RenderForm'
import RenderCarousel from '../components/appComponents/RenderCarousel'
import RenderError from '../funcionalidades/cidade'
import carousel from '../funcionalidades/carousel'


export default function Regiao(props){

    const [formValue, setFormValue] =  useState()  
    const [regionTemp, setRegionTemp] = useState()

    function renderRegionTemp(){
        const datas = regionTemp.data //datas que vem da API
        return(
            <div className='region-results d-flex flex-column justify-content-between rounded' >
                <h2 className='pt-4  mb-5'>Tempo em {regionTemp.region}  </h2>
                <div className='carousel-container-1 d-flex justify-content-center'>
                    {RenderCarousel(datas)}
                </div>                
            </div>
        )                                                                   
    }
    function isRegion(region_name){
        const reg_lower = region_name.toLowerCase() 
        const regions = ['nordeste', 'norte', 'sul', 'sudeste', 'centro oeste'] // a api externa só busca com valores exatos.
        return regions.includes(reg_lower)
    }                                                           

    return (
        <div className=" content city-container d-flex flex-column  justify-content-start align-items-center mt-5">
            {RenderForm({
                locale: 'regiao', //locale = tipo de recurso da api
                name: 'regiao_input',
                formClasses: 'regiao-form',
                cb(e){
                    setFormValue(e.target.value)
                },
                
                click(){
                    formValue && isRegion(formValue.toString()) ?
                        getRegionTemp({region_name: formValue}).then(r => r[0] === 200 ? setRegionTemp(r[1]) : RenderError(r[1], 'header',))
                    : RenderError('Digite o nome da região corretamente! ', 'header')
                }
            })}
            {regionTemp && renderRegionTemp()}
        </div>
    )
}