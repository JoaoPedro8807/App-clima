import { convertUserDate } from "../../APIServices/ConvertData"
import Button from "../Button"
import { Fragment, useEffect } from "react"
import { useState } from "react"
import deleteUser from "../../APIServices/user/deleteUser"
import RenderEditUser from "./RenderEditUser"
import RenderMessage from './RenderMessage'

//renderiza a página de usuários e controla o CRUD
export default function RenderUsers(props){

    const users = props.pagination.results || []

    const [showConfirm, setShowConfirm] = useState(false)
    const [userToRender, setUserToRender] = useState() // guarda um user no estado, ele será usado para renderizar o edit.
    const [showMessage, setShowMessage] = useState(false)
    const [putSuccess, setPutSuccess]  = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const pages = Array(props.pagination.pages).fill(0)  //pages que vem da API
    const pageItens = document.querySelectorAll('.numbers') // botoes do pagination


    const handleDeleteClick = (user) => {
        setUserToRender(user)
        setShowConfirm(true)
    }

    const handleConfirmCancel = () => {
        setShowConfirm(false)
    }

    const handleConfirmDelete = () =>{
       deleteUser(userToRender)
       .then(resp =>{
            setShowConfirm(false)
            setShowMessage(resp[1])
       })
       .finally(()=>{
        props.att(true)
        setUserToRender(null)
       })
       setShowMessage()
    }   
    //seta o user no estado e ativa o offcanvas que irá rendedizar o user
    const handleShowEditUser = (user)=> {
        setUserToRender(user)
        handleOffCanvas()
    
    }
    //troca de classes do offcanvas
    const handleOffCanvas = () =>{
        document.querySelector('.edit-user-container')
        .classList.toggle('offcanvas-active')

        document.querySelector('.drop')
        .classList.toggle('backdrop')
    }


    const handleEditUser = (msg) => {
        console.log('mesagem do put/delete: ', msg)
        setPutSuccess(true)
        props.showMsg(msg)
    }

    //controla o sucesso da solicitação DELETE/PUT, limpa o user, att o paginattion, limpa o estado do user, e esconde o offcanvas
    useEffect(()=>{
        if(putSuccess){
            setUserToRender()
            props.att(true)
            setPutSuccess(null)
            handleOffCanvas()
        }
    }, [putSuccess])

   
    function changeTarget(newTarget){
        pageItens.forEach((item, i) => {
            if (i + 1 === newTarget) {
                item.classList.add('target')
            } else {
                item.classList.remove('target')
            }
        })
    }

    //respectivamente: busca no Flask o próximo paginate, altera o estado da página corrente,  e muda o target do pagination do Ract
    //o evento do click vem pra essa funcão principal, que irá ordernar a ordemdos algoritimos para alteração da página.
    const escolherPage = (page) => {
        if(page < 1 || page > pages.length) return 
        props.changePage(page)
        setCurrentPage(page)
        changeTarget(page)
    }


    return(
        <Fragment>
        <div className="table-responsive">
            <table className="table table-dark result-table table-users">
                <thead className="t-head-user">
                    <tr className="">
                        <th></th>
                        <th className="col">Nome</th>
                        <th className="col">Email</th>
                        <th className="col">Criado em</th>
                        <th className="col"></th>
                        <th className="col"></th>
                    </tr>
                </thead>
                <tbody className="tbody-user">
                {users.map(((user, i)=> {
                    return(     
                        <tr key={i} className="tr-user">
                            <th scope="row"></th>
                            <td className="">{user.name}</td>
                            <td className="">{user.email}</td>
                            <td className="">{convertUserDate(user.create_at)}</td>
                            <td className="btn-list-crud"><Button btnClass="warning"  text="Editar" click={() => handleShowEditUser(user)}/></td>
                            <td><button className="btn btn-danger" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" 
                                    onClick={() => handleDeleteClick(user)}>
                                <i className="fa fa-trash-o"></i>
                            </button></td>
                        </tr>        
                        )
                }))}
                </tbody>
            </table>   
            <nav aria-label="Page navigation example" className="pagination-nav">
                <ul className="pagination pagination-ul p-3 m-3">
                        <li className="page-item"><a className="btn" href="#" onClick={()=> escolherPage(currentPage-1)}> <i className="fa fa-arrow-left"></i> </a></li>
                        {pages.map((e, i)=>{
                            return(
                                <li  key={i} className="page-item"><a className={`numbers btn ${currentPage === i+1 ? 'target' : ''}`}
                                 href="#" onClick={() => escolherPage(i+1)}>{i+1}</a></li>
                                )
                            }
                        )}

                        <li className="page-item"><a className="btn" href="#" onClick={() => escolherPage(currentPage+1)}><i className="fa fa-arrow-right"></i></a></li>
                    </ul>
            </nav>
        </div>

            <div className="offcanvas  offcanvas-bs offcanvas-top" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <h2 className="crud-text" id="offcanvasTopLabel">Excluir usuário</h2>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleConfirmCancel} ></button>
                </div>
   
                <div className="offcanvas-body">

                    {showConfirm && userToRender && (
                        <h5 className="crud-text">Tem certeza que deseja excluir  <strong>{userToRender.name} ({userToRender.email}) </strong>da lista de usuários?</h5>
                    )}


                </div>
                <div className="btn-container">
                    <button className="btn btn-del-confirm btn-crud"  data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleConfirmDelete} >Confirmar</button>
                    <button className="btn btn-del-cancel btn-crud" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleConfirmCancel} >Cancelar</button>
                </div>
            </div>
            {showMessage && <RenderMessage msg={showMessage} />}
            <div className="drop">
                    <RenderEditUser  cbFetch={handleEditUser}  user={userToRender ? userToRender : '' }/>
            </div>
            
        </Fragment>  
    )
}