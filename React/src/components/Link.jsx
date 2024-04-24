import React, { Fragment} from "react";
import './Link.css'

export default props =>
(
    <a href={props.link} className={props.className} target={props.target ? props.target : ''}>
        {props.children}
    </a>
)       