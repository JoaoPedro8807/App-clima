export default function RenderError(err, div, position, options){
 
    const table = document.querySelector(`.${div}`) || document.querySelector('.header')  || document.querySelector('.city-results')

    const divError = document.createElement('div')
    divError.innerHTML = 
        `<div class="container-msg-error">  
            ${err}
        </div>`

    divError.classList.add('alert', 'alert-danger', 'd-flex', 'align-items-center', 'hide', 'render-error', 'mb-5' )
    divError.role = "alert" 

    if(!position) position = 'afterbegin'

    if(table){
        table.insertAdjacentElement(`${position}`, divError)
    }

    setTimeout(() =>{ 
        divError.remove()
    }, 3000)
    
}

