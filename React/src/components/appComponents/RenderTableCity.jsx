import RenderRowsCity from "./RenderRowsCity"

export default function RenderTableCity(props){

return(
        <div className='city-results'>
            <h3 className='mt-5' style={{textAlign: 'center'}}>Cidade encontradas: </h3>
            <div className="result-table-container">

            <table className=" result-table  table table-city"> 
                <thead className=''>
                    <tr className='rounded-top'>
                        <th></th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <RenderRowsCity list={props.list}  setTempCity={props.setTempCity} />
                </tbody> 
            </table>   
            </div>                              
        </div>
)
}