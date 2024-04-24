import Input from "../Input";
import Link from "../Link";
import Button from "../Button";
import Label from "../Label";
import fetchLogin from "../../APIServices/user/userLoginFetch";
import { useLocation } from "react-router-dom";
import {useState } from "react";
import { NavLink } from "react-router-dom";
import RenderError from "../../funcionalidades/cidade";

export default function RenderLogin(props){
    const location = useLocation()
    const { messageLogin } = location.state || ''

    const [msgError, setMsgError] = useState(messageLogin)

    return(
        <div className="login">
        <form action="" className="formLogin" name="formLogin" id="formLogin" 
            onSubmit={(e) => fetchLogin(e).then(resp => resp[0] == 200 ? props.cb(resp[1]) : 
                RenderError(resp[1], 'login-container', 'afterbegin', {width: 'w-100'} ))}>

        <section className="vh-100 login-container">
            <div className="container  h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-5 inputs-container">
                        <div className="card-login">
                            <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Faça seu login para acessar a APP</p>

                            <div className="form-outline form-white mb-4">
                                <Input name="inputEmail" id="inputEmail" type="email" placeholder="Digite seu email"/>
                                <Label for="inputEmail" text="Email"  />
                            </div>

                            <div className="form-outline form-white mb-4">
                                <Input name="inputPass" id="inputPass" type="password" placeholder="Digite sua senha"/>
                                <Label for="inputPass" text="Senha" />
                            </div>


                            <Button btnClass="btn btn-outline-light btn-lg px-5" type="submit" text="Enviar"/>
                            

                            <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                <Link link="" className="text-white"> <i className="fa fa-twitter "></i></Link>                    
                                <Link link="https://www.instagram.com/jpgomes001/?hl=pt-br" target="_blank" className="text-white"> <i className="fa fa-instagram"></i></Link>
                                <Link link="https://github.com/JoaoPedro8807" target="_blank" className="text-white"> <i className="fa fa-github"></i></Link>
                            </div>
                            
                            </div>

                            <div>
                            
                            <NavLink to="/cadastrar_user" >
                                <p className="mb-0"><a href="#!" className="text-white-50 fw-bold">Cadastrar-se</a> </p>
                            </NavLink>
                            </div>
                            </div>

                        </div>

                    </div>
                </div>
                {msgError && (
                        <div className="position-fixed bottom-0 end-0 p-3" style={{'zIndex': '11'}} id="msg-display">
                        <div id="liveToast" className="toast show" role="alert " aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                            <strong className="me-auto login-msg">{msgError}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div className="toast-body">
                                <p>Faça o login novamente, ou entre em outra conta para acessar o app</p>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </section>                
        </form>
    </div>
    )
}