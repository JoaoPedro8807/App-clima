import React from "react";
import './Header.css'
import { useSelector } from 'react-redux'      
import { convertUserDate } from "../APIServices/ConvertData";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userReducer/slice";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";


export default props =>{

    const { currentUser } = useSelector((state) => state.userReducer);
    const  dispatch  = useDispatch()
    const navigate = useNavigate()

    const logout = (user_name) =>{
        dispatch(logoutUser())
        navigate('/login', {
            state:{
                messageLogin: `Usuário ${currentUser.name} deslogado com sucesso!`
            }
        })
      
    } 

return(
    <header className="header d-flex justify-content-between">
        <div className="m-5">
        </div>
        <div className="title-container align-self-center">
            <h1 className="header-title">CLIMA</h1>
        </div>  
            <section className="user_info header-item p">
                <button className="btn fa fa-user btn-user" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Usuário</button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Informações de <span className="badge bg-light text-dark show-data">{currentUser.name}</span></h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="offcanvas-ul">
                            <li>Email cadastrado: <span className="badge bg-light text-dark show-data">{currentUser.email}</span></li>
                            <li>Data de criação: <span className="badge bg-light text-dark show-data">{convertUserDate(currentUser.create_at)}</span></li>
                                <li>
                                    <span>Permissão de: <br></br>
                                        <span className="badge bg-success mt-3">{currentUser.roles}</span>
                                    </span>
                                </li>
                                    <ul>
                                        <li><p><span className="badge bg-success"></span></p></li>
                                    </ul>
                            <Button btnClass="logout">
                                <span className="badge show-data w-100 p-4 bg-danger bs-light" 
                                    onClick={() => {
                                        logout(currentUser.name)
                                        }} 
                                    ><a>DESLOGAR</a>
                            </span></Button>
                        </ul>

                    </div>
                </div>
        </section>
    </header>
)}  