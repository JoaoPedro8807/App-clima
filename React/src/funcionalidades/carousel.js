export default function carousel(){

    const btns = document.querySelectorAll('.btn-carousel')

    const itens = document.querySelectorAll('.carousel-item')
    console.log(itens)

    btns.forEach((b => b.addEventListener("click", (e) => {
        let target = ''
        e.target.classList.contains('carousel-control-prev-icon') ? target = 'down' : target = 'up'
        next(target)
        })
    ))

    function next(target){
        for(let i=0;  i < itens.length; i++){
            if(itens[i].classList.contains('active')){
                if(target === 'up'){
                    nextActive(i)
                    break;
                }else{
                    prevActive(i)
                    break;
                }       
            }
        }    
    }

    function nextActive(i){
        console.log('next', i)
        itens[i].classList.remove('active')
        itens[i+1].classList.add('active')
        //itens[1].classList.add('active') //make return the next indice only once
    }
    function prevActive(i){
        console.log('prev', i)
        itens[i].classList.remove('active')
        itens[i-1].classList.add('active')
        
    }


}



