import { Fragment } from "react"
import { useEffect, useState } from "react"
import editUser from "../../APIServices/user/editUser"
import Input from "../Input"
import Label from "../Label"
import RenderError from "../../funcionalidades/cidade"

export default function RenderEditUser(props){

    const [toggleCanvas, setToggleCanvas] = useState(false)

    //usa o state para ativar o offcanvas
    useEffect(()=>{
        document.querySelector('.edit-user-container')
        .classList.remove('offcanvas-active')

        document.querySelector('.drop')
        .classList.remove('backdrop')
    }, [toggleCanvas])

    

    return (
        <Fragment>
            <div  className="edit-user-container">
                <div className="edit-user-main">
      
                <div className="edit-user-top">
                    <h1 className="edit-title">Editando {props.user.name}</h1>
                    <button onClick={() => setToggleCanvas(!toggleCanvas)} className="btn"><i className="fa fa-times"></i></button>
                </div>

                <div className="edit-user-main">


                    <form onSubmit={(e) => editUser(e, props.user)
                        .then(resp => resp.response.ok ?  props.cbFetch(resp.data): RenderError(resp.data.error, 'users-container')  )}>  
                        
                        <div className="mb-3 mt-5">
                            <Input name="inputNewName" id="inputNewName" type="text" placeholder={props.user.name}/>
                            <Label for="inputNewName" text="Digite o novo nome"  />
                        </div>

                        <div className="mb-3 mt-5">
                            <Input name="inputNewEmail" id="inputNewEmail" type="email" placeholder={props.user.email}/>
                            <Label for="inputNewEmail" text="Digite o novo email"  />
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="inputNewAdmin" name="inputNewAdmin"></input>
                            <label className="form-check-label" htmlFor="inputNewAdmin">Definir como admin</label>
                        </div>
                        <button type="submit" className="btn btn-edit-submit ">Submit</button>
                    </form>
                </div>
            </div>
            </div>
           
        /</Fragment>
    )
}