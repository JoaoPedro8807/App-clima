import {useState}  from "react"

export default function Pagination(props){

    const itens = props.horarios
    const pagination_configs = {
        per_page:  4,
        total_length: itens.length,
    }
    const [currentPage, setCurrentPage] = useState(1)


    function get_item_page(list, offset, per_page){ //retorna a lista fatiada a cada chamada do pagination
        return list.slice(offset, offset + per_page)
    }

    const renderPage = (page, per_page) => {
        let result = []
        let realPage = page - 1 //diminuindo 1 para bater com o índice do array
        let perPage = per_page || pagination_configs.per_page //deixei aberto caso eu queira mudar depois, e um valor padrão nas configs do pagination
        let offset = perPage * realPage //contador auxiliar
        let pages = get_item_page(itens, offset, perPage)
        {pages.map((e, i)=> {
            result.push(
                <div className='ul-result'  key={i}>
                    <span className="data-api">{e.date_br}</span>
                    <ul className="ul-pagination">
                        <li className="dados-result">Temperatura <i className="fa fa-t  hermometer-full"></i>:<span className="api-result"> {e.temperature.temperature} ºC</span></li>
                        <li className="dados-result">Preciptação de chuva <i className="fa fa-umbrella"></i>:<span className="api-result"> {e.rain.precipitation * 100} %</span></li>
                        <li className="dados-result">humidade <i className="fa fa-tint"></i>:<span className="api-result"> {e.humidity.humidity} %</span></li>
                        <li className="dados-result">Pressão <i className="fa fa-sort-amount-asc"></i>:<span className="api-result"> {e.pressure.pressure}</span></li>
                        <li className="dados-result">Velocidade do vento <i className="fa fa-cloud"></i>:<span className="api-result"> {e.wind.velocity} km/h</span></li>
                    </ul>
                </div>
            )
        })}   
    return result
}
    function escolherPage(page){
        setCurrentPage(page)
        changeTarget(page-1)
    }

    function next(){
        if(currentPage >= pagination_configs.total_length || currentPage < 1) 
            return        
        setCurrentPage(currentPage+1)
        changeTarget(currentPage)
    }    

    function prev(){
        if(currentPage <= 1 || currentPage > pagination_configs.total_length )
            return 
        setCurrentPage(currentPage-1)
        changeTarget(currentPage-1)
    }

    function changeTarget(newTarget){
        let currentTarget = document.querySelector('.target')
        currentTarget.classList.remove('target')
        const pageItens = document.querySelectorAll('.numbers')
        pageItens[newTarget].classList.add('target')
    }   

    return(
            <div className="pagination-container">
                <div className="pagination-title">
                    <h2 className="pagination-h2">Clima nos próximos horários para <span className="title-result">{props.city.name} - {props.city.state} ({props.city.country})</span> </h2>
                </div>
            <div className={currentPage < 3 ? `pagination-result dia`: currentPage < 5 ? `pagination-result tarde` :  `pagination-result noite`}>
                {renderPage(currentPage, 4)}    
            </div>
            <nav aria-label="Page navigation example" className="pagination-nav">
                <ul className="pagination pagination-ul p-3 m-3">
                        <li className="page-item"><a className="btn" href="#" onClick={()=> prev()}> <i className="fa fa-arrow-left"></i> </a></li>
                        <li className="page-item"><a className="numbers btn target"  href="#" onClick={() => escolherPage(1)} >1</a></li> 
                        <li className="page-item"><a className="numbers btn" href="#" onClick={() => escolherPage(2)}>2</a></li>
                        <li className="page-item"><a className="numbers btn" href="#" onClick={() => escolherPage(3)}>3</a></li>
                        <li className="page-item"><a className="numbers btn" href="#" onClick={() => escolherPage(4)}>4</a></li>
                        <li className="page-item"><a className="numbers btn" href="#" onClick={() => escolherPage(5)}>5</a></li>
                        <li className="page-item"><a className="numbers btn" href="#" onClick={() => escolherPage(6)}>6</a></li>
                        <li className="page-item"><a className="btn" href="#" onClick={() => next()}><i className="fa fa-arrow-right"></i></a></li>
                    </ul>
            </nav>
            </div>
    )
}