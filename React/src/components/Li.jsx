export default function(props){
    return(
        <li className={props.classe} key={props.key}>
            {props.texto} {props.children}</li>
    )
}