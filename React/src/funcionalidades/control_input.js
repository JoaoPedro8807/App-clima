const control_input = () =>{
    const pass_input = document.querySelector('#register_senha')
    const msgs_container = document.querySelector('.msgs-required')

    let elementos = document.querySelectorAll('.elements-required')
    console.log('msg: ', msgs_container)
    console.log('elementos: ', elementos)
    let casos = [
        /[a-z]/g,
        /[A-Z]/g,
        /[0-9]/g,
        /.{8,20}/g,
    ]
    const Map_elementos_casos = new Map()
    
    for(let i=0; i<elementos.length; i++){
        Map_elementos_casos.set(casos[i], elementos[i]) 
    }

    const checked = <i className="fa fa-check"></i>

    console.log(Map_elementos_casos.keys)
    
    pass_input.onfocus = () => {
        msgs_container.classList.remove('msg-none')
        msgs_container.classList.add('msg-show')
    }
    
    pass_input.onblur = () => {
        msgs_container.classList.remove('msg-show')
        msgs_container.classList.add('msg-none');
    }
    
    pass_input.onkeyup = () =>{
        Map_elementos_casos.forEach((key, value)=>{ //key = elemtno DOM, value = regex
            verify_case(pass_input, key, value)
        })
    }
    
    const verify_case = (input, elemento, caso) =>{
        console.log(elemento)
        if(input.value.match(caso)){
            elemento.classList.remove('invalid');
            elemento.classList.add('valid');

            
        }
        else{
            elemento.classList.remove('valid');
            elemento.classList.add('invalid');
        }
    }
}

export default control_input
