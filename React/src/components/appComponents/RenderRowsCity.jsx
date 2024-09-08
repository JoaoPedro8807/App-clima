import Button from "../Button"
import getCityTemp from "../../APIServices/getCityTemp"
import RenderError from "../../funcionalidades/cidade"

export default function RenderRowsCity(props){
    return props.list.map((city, i) => {
        return (
            <tr key={i} className=''>
                <th scope=''></th>
                <td className='result-td'>{city.nome}</td>
                <td className='reuslt-td'>{city.estado}</td>
                <td className='result-td'><Button btnClass="primary btn-acao" text="Selecionar" 
                click={() => getCityTemp(city.id).then(r => r[0] === 200 ? props.setTempCity(r[1]) : RenderError(r, 'header'))}/></td>
            </tr>
        )
    })
}