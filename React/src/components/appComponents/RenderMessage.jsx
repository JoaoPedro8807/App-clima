export default function RenderMessage(props){
    const timer = setTimeout(()=>{ //timer para remover a class que ativa o block do meu proprio Offcanvas
        let toast = document.querySelector('.toast')
        if(toast){
            toast.remove()
        }
    }, 4000)
    
    return(
    <div className="position-fixed bottom-0 end-0 p-3 toast-container" style={{"zIndex": 11}}>
        <div id="liveToast" className="toast show fade fadeOut " role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">Mensagem:</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {props.msg}
            </div>
        </div>                                                                  
    </div>
    )
}