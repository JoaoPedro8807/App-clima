import Button from "../Button"
import Input from "../Input"
import Label from "../Label"

import './RenderForm.css'

//renderiza os tanto o form da para cidade quanto região
export default function RenderForm(props){
    return(
            <div className={`form ${props.formClasses} locale-form`}>
                <div className="row d-flex justify-content-around form-item ">
                    <div className="col-12 col-md-6 w-100">
                        <Label classes="label-form"  for={props.name} text={`${props.locale}`} />
                        <Input nome={props.name} id={props.name}  type="text" cb={props.cb} />
                    </div>
                </div>
                <div className="row d-flex justify-content-around form-item" >
                    <div className="col-12 d-flex justify-content-around">
                        <Button btnClass=" btn-outline-info btn-send mt-3 " text="Enviar" click={() => props.click()} />
                    </div>
                </div>

            </div>
    )
}

