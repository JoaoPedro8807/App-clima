import React from "react";


export default props => 
(
    <input
    name={props.name}
     id={props.id} 
     type={props.type} 
     className="form-control form-control-lg"  
     placeholder={props.placeholder} 
     onChange={props.cb}
     required
    />
)