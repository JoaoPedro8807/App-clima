import { useState, useEffect } from "react"
import Input from "../components/Input"
import Label from "../components/Label"
import Button from "../components/Button"
import createUser from "../APIServices/user/create_user"
import RenderError from "../funcionalidades/cidade"
import control_input from "../funcionalidades/control_input"
import { useNavigate } from "react-router-dom";

export default function CadastrarUser(){

    useEffect(()=>{
        control_input() // renderização dos requisitos de acordo com o input do usuário
    }, [])


    const [msgError, setMsgError] = useState()
    const navigate = useNavigate()

    const handleLogin = (e) =>{
        e.preventDefault()
        const pass = document.querySelector('#register_senha')
        const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/
        if(!REGEX_PASS.test(pass.value)){
            RenderError('Senha não atende ao requisitos', 'login-container')
            return
        }
        createUser(e).then(resp =>  resp[0] === 200 ? navigate('/') : RenderError(resp[1], 'login-container'))
        
    }
    
    return(
        <div className="login">

        <form action="" method="POST" className="formLogin" name="formLogin" id="formLogin" onSubmit={handleLogin}>
            <section className="vh-100 login-container">
                <div className="container  h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-10 col-xl-12">
                            <div className="card-login w-100">
                                <div className="card-body  p-5 text-center"  >

                                <div className=" mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">CADASTRAR</h2>
                                <p className="text-white-50 mb-2">app clima</p>

                                
                                <div className="form-outline form-white mb-4">
                                    <Input name="register_name" id="register_name" type="text" placeholder="Digite seu nome"/>
                                    <Label for="register_name" text="Nome"  />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <Input name="register_email" id="register_email" type="email" placeholder="Digite seu email"/>
                                    <Label for="register_email" text="Email"  />
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input 
                                    type="password"
                                    name="register_senha"
                                    id="register_senha"
                                    required
                                    placeholder="Digite a senha" 
                                    className="form-control form-control-lg"
                                    />
                                    <Label for="register_senha" text="Senha" className='form-control form-coontrol-lg' />
                                </div>

                                <Button btnClass="btn btn-outline-light btn-lg px-5 w-100 btn-create-send" type="submit" text="Enviar"/>

                                <div className="w-100  flex-column  msg-required-container">

                                <div className="mb-3 form-check d-flex justify-content-between flex-wrap">
                                        <div className="pt-5">
                                            <input type="checkbox" className="form-check-input"  name="register_admin" id="register_admin"></input>
                                            <label className="form-check-label" htmlFor="register_admin">Definir como admin</label>
                                        </div>

                                        <div className="msgs-required msg-none  align-self-center">
                                            <h4 className="required-title">A senha precisa ter:</h4>
                                            <p id="lower" className="invalid elements-required">Uma <b>Letra minúscula</b></p>
                                            <p id="upper" className="invalid elements-required">Uma <b>Letra Maiúscula</b></p>
                                            <p id="number" className="invalid elements-required">Um <b>Número</b></p>
                                            <p id="length" className="invalid elements-required"><b>de 8 a 20 caracteres</b></p>
                                        
                                        </div>

                                        <div className="span px-5"></div>
                                </div>
                                        
                                    </div>
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