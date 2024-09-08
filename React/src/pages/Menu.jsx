import { useState,  useEffect} from 'react'
import './Menu.css'
import GetHome from '../APIServices/Home'
import RenderRelogio2 from '../components/appComponents/RenderRelogio2'
import RenderTimerFinish from '../components/appComponents/RenderTimerFinish'
import Link from '../components/Link'
import Li from '../components/Li'
import { useLocation } from 'react-router-dom';
import RenderError from '../funcionalidades/cidade';

export default function Menu(){

    const [city, setCity] = useState({name: null, state: ''})
    const [hora, setHora] = useState()
    const [timerFinish, setTimeFinish] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    const location = useLocation()
    const { message  } = location.state || ''

    useEffect(()=> {
        if(message)
            RenderError(message, 'menu')
    }, [message])

    

    useEffect(() => {
        GetHome().then(res => {
            setCity(res.dados)  
            setHora(res.h_format)
            setIsLoading(false)
        })
    }, [])

    
    function CbFinish(){
        setTimeFinish(!timerFinish)
        setCity({name: 'A definir', state: ''})
    }
    
    
return (
    <section className="menu content">          
        <div className="  menu-cotainer">
            <div id="carouselExampleCaptions" className="carousel carousel-menu slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            
            <div className="carousel-inner">
                {!isLoading && (  //agurdando a promisse 
                <div className="carousel-item active">
                        <div className="carousel-item-content">
                        <div className='api-time-container'>
                            <h4>Cidade padrão: <span className='show-city-default'>{city.name} - {city.state}</span></h4>
                            <div className='api-time'>
                                <p>Tempo restante:<br></br> { !timerFinish && <RenderRelogio2 hora={hora} CbFinish={CbFinish} /> } </p>
                                <div className='api-time-default'>
                                    { timerFinish && <RenderTimerFinish />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                <div className="carousel-item">
                    <br></br>
                    <div className="carousel-item-content">  
                        <div className="api-time-container">
                            <Link link="https://advisor.climatempo.com.br/" target="_blank" className="link-api-externa">API EXTERNA</Link>
                            <div className="api-container-item">
                            <p className='api-time-text'>A versão da API ainda é gratuita, então só é possível solicitar apenas uma cidade padrão, que esta pode ser 
                            trocada a cada 24h.</p>
                            </div>
                        </div>
        
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="carousel-item-content">
                        <div className="api-time-container">
                            <h1 className='link-api-externa'>Minhas Redes</h1>
                            <div className="api-container-item">
                                <ul>
                                    <Li ><Link link="https://github.com/JoaoPedro8807" target="_blank" className='fa fa-github menu-icon'> Github</Link></Li>
                                    <Li ><Link link="https://www.instagram.com/jpgomes001/?hl=pt-br" target="_blank" className='fa fa-instagram menu-icon'> Instagram</Link></Li>
                                    <Li ><Link link="https://www.twitch.tv/jhonpedro" target="_blank" className='fa fa-twitch menu-icon'> Twitch</Link></Li>
                                </ul>
                                <p>Dá uma passadinha lá<span className='fa fa-smile-o'></span></p>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </div>
        
        <div className="app-text-container">
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <p>Como funciona <i className='fa fa-wrench'></i></p>
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <p> Você pode pesquisar ilimitadamente o clima atual de uma cidade, desde que essa seja a cidade padrão.</p>
                            <p>Também é possível pesquisar o clima dos próximos 3 dias para uma determinada região do Brasil.</p>
                            <p>Pesquisar a previsão do clima das próximas 24H da cidade padrão.</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        <p>Restrições<i className='fa fa-lock'></i></p>
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <p><strong> CIDADE PADRÃO: </strong>Como a versão da API externa é gratuita, é permitido pesquisar apenas sobre a cidade que foi definida
                            como padrão, e essa cidade só pode ser alterada a cada 24h, o tempo restante está no início dessa página.</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        <p>ADMIN</p>
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            <p>No app contém funcionalidades exclusivas para usuários administradores, como por exemplo o CRUD de usuários. Para acessar, basta selecionar <strong>'Definir como usuário'</strong> ao cadastrar-se, ou ao editar usuários. </p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )   
    
}

