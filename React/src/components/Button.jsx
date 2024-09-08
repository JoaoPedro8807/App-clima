import React from "react";

export default props =>
(
    <button className={`btn btn-${props.btnClass} `} onClick={props.click} type={props.type} style={props.color ? {color: `${props.color}`} : {color: 'white'} } >
        {props.text}
        {props.children}
    </button>
)
