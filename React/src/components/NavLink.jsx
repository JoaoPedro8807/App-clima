import { Link } from "react-router-dom";
import './NavLink.css'
export default function NavLink(props){

    return (
        <Link to={props.link} className={`nav-link ${props.class}`} style={{fontSize: `${props.size}em`}} onClick={props.onClick}> 
        <i className={`fa fa-${props.icon}`} ></i>
        {props.children}
        <p className="w-100"> {props.texto} </p>
    </Link>
    )

}