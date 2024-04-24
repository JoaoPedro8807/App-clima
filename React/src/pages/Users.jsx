import getUser from "../APIServices/user/get_users"
import { useEffect, useState } from "react"
import RenderUsers from "../components/appComponents/RenderUsers"
import RenderError from "../funcionalidades/cidade"
import RenderMessage from '../components/appComponents/RenderMessage'
import './Users.css'

export default function Users(){
    const [pagination, setPagination] = useState()
    const [attList, setAttList] = useState()
    const [showMsg, setShowMsg] = useState()
    const [page, setGetPage] = useState(1)
    
    useEffect(()=> {
        getUser(page)
            .then(resp => resp[0] === 200 ? setPagination(resp[1]) 
            : RenderError(resp[1], 'users-container'))
            setAttList()
    }, [attList, page])

    return(
        <div className="users-container blur-background">
            <h2>Lista de usuários: </h2>
            <div className="table-container ">
                {showMsg && <RenderMessage  msg={showMsg}/> } {/*Msg que vem do fetch do RenderEditUser */}
                {pagination && <RenderUsers pagination={pagination} att={setAttList} showMsg={setShowMsg} changePage={setGetPage}/>}    
            </div>
    
        </div>
    )
}