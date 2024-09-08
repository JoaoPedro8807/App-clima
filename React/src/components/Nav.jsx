import { useState, useEffect, useRef } from "react"
import NavLink from "./NavLink"
import './Nav.css'


export default  function Nav(props){

    const navContainer = useRef(null)
    const [status, setStatus] = useState(false)
    console.log('btn status ', status)

    const handleNavShow = () =>{
        navContainer.current.classList.toggle('active')
    }

    

    return (
        <div className="d-flex justify-content-center w-100 flex-wrap">
            <button className="burguer btn hide" onClick={() => handleNavShow()}> 
                <i className="fa fa-bars"></i></button>
            <div ref={navContainer} className="w-100 nav-container ">
                <nav className="nav-area hide d-flex flex-column align-items-center justify-content-start w-100">    
                    <NavLink size="1.5" link='/menu' icon='home' texto='Inicio' onClick={handleNavShow}/>
                    <NavLink link='/cidade' icon='thermometer-empty' texto='Pesquisar por cidade' onClick={handleNavShow}/>
                    <NavLink link='/regiao' icon='thermometer-empty' texto='Pesquisar por região' onClick={handleNavShow} />
                    <NavLink link='/24h_city' icon='area-chart' texto='Últimas 24h' onClick={handleNavShow}/>
                    <NavLink link='/users' icon='users' texto='Usuários cadastrados (admin)' onClick={handleNavShow}/>
                </nav>  
            </div>

    </div>
    )
}





