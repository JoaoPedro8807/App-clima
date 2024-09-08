import React from "react";

export default props =>
(
    <label htmlFor={props.for} className={`label w-100 ${props.classes}  `}  style={{textAlign: 'center'}}>{props.text}</label>

)