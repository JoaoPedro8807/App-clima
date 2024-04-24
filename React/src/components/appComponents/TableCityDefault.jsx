import { useEffect, useState } from "react"
import Button from "../Button"
import setDefaultCity from "../../APIServices/setDefaultCity"
import RenderError from "../../funcionalidades/cidade"

//renderiza as cidades para definir uma como cidade padrão, é 
export default function TableCityDefault(props){

    const [display, setDisplay] = useState(false) //controla o estado do toast, que irá mostrar a mesnsagem caso a cidade for definida com sucesso.

    useEffect(() => { // controle do toast
        if (display) {
            const displayToast = document.querySelector('#liveToast');
            displayToast.style.display = 'block';

            setTimeout(() => {
                displayToast.style.display = 'none';
                setDisplay(false); 
            }, 5000);
        }
    }, [display]);

    return(
        
        <div className='city-results d-flex justify-content-around flex-column'>
                <h3 className='mt-5' style={{textAlign: 'center'}}>Cidade encontradas: </h3>
            <table className=" result-table table">
                <thead className=''>
                    <tr className='rounded-top'>
                        <th></th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
            
                    {props.cityFound.map((city, i) => {
                        return (
                            <tr key={i}>
                                <th></th>
                                <td> {city.nome} </td>
                                <td> {city.estado} </td>           
                                <th><Button btnClass="warning btn-acao btn-default" text="Definir como padrão" 
                                click={() => setDefaultCity({id: city.id, name: city.nome, state: city.estado})
                                .then(response => response[0] === 200 ?  setDisplay(true) : RenderError(response[1]))} /> </th>  
                            </tr>
                        )
                    })}                            
                </tbody> 
            </table>                                 
          
            <div class="position-fixed bottom-0 end-0 p-3" style={{'z-index': '11'}} id="msg-display">
            <div id="liveToast" class="toast" role="alert " aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <img src="..." class="rounded me-2" alt="..."></img>
                <strong class="me-auto">CIDADE DEFINIDA COM SUCESSO</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <p>Agora você pode voltar e pesquisar por essa cidade a qualquer momento</p>
                </div>
            </div>
        </div>
    </div>
)
}
