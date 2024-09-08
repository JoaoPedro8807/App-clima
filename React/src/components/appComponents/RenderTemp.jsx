import convertData from "../../APIServices/ConvertData"

export default function RenderTemp(props){
    return(
            <div className='temp-results d-flex flex-column  justify-content-center rounded' >
                <h2 className='pt-4  mb-5'>Tempo em {props.tempCity.name}</h2>
                <div className=' d-flex justify-content-around'>
                    <div className='local'>
                        <ul>    
                            <li>País:  {props.tempCity.country} </li>
                            <li>Estado: {props.tempCity.state} </li>
                            <li>Cidade:  {props.tempCity.name} </li>
                        </ul>
                    </div>

                    <div className='temp-datas align-self-center'>
                        <ul>
                            <li> <i className='fa fa-thermometer-empty '> Temperatura: </i><span className='data-result'> {props.tempData.temperature} ºC</span> </li>
                            <li> <i className='fa fa-sun-o'> Sensação: </i>  <span className='data-result'> {props.tempData.sensation} ºC</span> </li>
                            <li> <i className='fa fa-tint'> Humidade: </i><span className='data-result'> {props.tempData.humidity} %</span> </li>
                            <li> <i className=" fa fa-cloud "> Velocidade do vento </i><span className='data-result'> {props.tempData.wind_velocity} km/h</span> </li>
                            <li> <i className='fa fa-umbrella'> Condição do tempo: </i>  <span className='data-result'> {props.tempData.condition}</span> </li>
                        </ul>
                    </div>

                    <div className='temp-date'>
                        <p className='data-result date-result'>{convertData(String(props.tempData.date))}</p>
                    </div>
                </div>     
        </div>
    )
}