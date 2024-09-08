export default function RenderMessage(msg, div, styles){
 
    const table = document.querySelector(`.${div}`) || document.querySelector('.city-results') || document.querySelector('.form')

    const divError = document.createElement('div')
    divError.innerHTML = 
        `<div>  
            ${msg}
        </div>`
    divError.classList.add(`${styles}`, 'success', 'd-flex', 'align-items-center', 'hide')
    divError.role = "alert"
    table.insertAdjacentElement('afterbegin', divError)

    setTimeout(() =>{
        divError.remove()
    }, 3000)
    
}

