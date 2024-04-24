import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./Login";
import Menu from '../pages/Menu'
import Cidade from "../pages/Cidade";
import Regiao from "../pages/Regiao";
import SetDefaultCity from "../pages/setCityDefault";
import City_24h from "../pages/City_24h";
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux';
import Main from "./Main";
import { Navigate } from 'react-router-dom';
import Users from "../pages/Users";
import CadastrarUser from "../pages/CadastrarUser";

export default props =>{

    const { currentUser } = useSelector((state) => state.userReducer);

    //verifica a autenticidade do token, e seu tempo de expiração, protegendo as rotas no react, as do Flask também já estão protegidas com Decorators
    const isAthenticated = () => {
        if(currentUser === null) return false
        try{
            const token = jwtDecode(currentUser.jwt_token)            
            const expireToken = parseFloat(token.exp - token.iat, 10) 

            const now = new Date()
            const dateToken = new Date(token.iat * 1000).getTime() //converter tudo milisegundos p/ ficar mais fácil fazer conta com date
            const dif = now.getTime() - dateToken
            
            const issue_at =  now - dif //tempo em que o token foi gerado

            const exp_in = (expireToken * 1000) + issue_at
            const time_to_exp  = exp_in - now

            return time_to_exp >= 0 

        }catch(e){
            console.log('Erro na autenticação do token: ', e)
            return false
        }
    }
    /* cada rota que for própria  do nosso app (por exmeplo /cidade, /regiao ) irá ser renderizada dentro do componente Main, então a maioria dessas rotas rederizará esse
    componente, e no props.content do Main, irá conter o componente específico de cada rota própria do app */
    return(   
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={isAthenticated() ? <Main content={<Menu/>}/> : <Navigate to='/login'/> } />
            <Route path='*' element={isAthenticated() ? <Main content={<Menu/>}/> : <Navigate to='/login'/> } />
            <Route path='/login' element={!isAthenticated() ? <Login/> : <Navigate to='/'/>}/>  
            <Route path='/cadastrar_user' element={!isAthenticated() ? <CadastrarUser /> : <Navigate to='/'/>}/>  
            <Route path='/cidade' element={isAthenticated() ? <Main content={<Cidade />}/> : <Navigate to='/'/> } />
            <Route path='/regiao' element={isAthenticated() ? <Main content={<Regiao/>}/> : <Navigate to='/'/> } />
            <Route path='/24h_city' element={isAthenticated() ? <Main content={<City_24h/>}/> : <Navigate to='/'/> } />
            <Route path='/set_default' element={isAthenticated() ? <Main content={<SetDefaultCity/>}/> : <Navigate to='/'/> } />
            <Route path='/users' element={isAthenticated('administrador') ? <Main content={<Users/>}/> 
            : <Navigate to='/' state={{message: 'Você precisa ser administrador para poder acessar essa página'}}/> } /> 
        </Routes>
    </BrowserRouter>

    )
}