import React, { useEffect, useState } from "react";
import './Login.css'
import RenderLogin from "../components/appComponents/RenderLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'      
import { loginUser } from '../redux/userReducer/slice'
import { jwtDecode } from 'jwt-decode'

export default props => {
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    let navigate = useNavigate()

    //guarda o object user no localStorage e atuliza o reducer a cada dispatch 
    const decode_user =  (user) => {
        try{    
            const decode = jwtDecode(user.jwt_token)
            if(decode.roles){ 
                user = {...user, roles: decode.roles}//adicionando as rules do jwt no user
            }
            localStorage.setItem('currentUser', JSON.stringify(user))
            //por enquanto vou deixar o user no localStorage e no redux 
            dispatch(loginUser({
                name: user.name,
                email: user.email,
                create_at: user.create_at,
                token: user.jwt_token,
                roles: user.roles
            }))

            return true
        }
        catch(e){
            console.log('Erro ao definir usuario no redux', e)
            return false
        }
    }

    const handleLogin = (user) => {  
        if(decode_user(user)){
            setRedirect(true)
        }
    }

    useEffect(() => { //for any dispatch in Redux, this att the user state to origin state in local storage
        const storedUser = JSON.parse(localStorage.getItem('currentUser'))
        if(storedUser){
            dispatch(loginUser(storedUser)) 
        } 
    }, [dispatch])

    useEffect(() =>{
        if(redirect){
            navigate('/menu')
        }
    }, [redirect, navigate])

    return(
        <RenderLogin  cb={handleLogin} /> // callback só retorna caso o login dê certo, se não, o erro é renderizado no própio componente
    )
}

