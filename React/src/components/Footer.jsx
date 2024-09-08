import './Footer.css'
import Li from './Li'
export default props =>
(
    <footer className="footer d-flex flex-column align-items-center justify-content-around">
        <div className="footer-container d-flex  justify-content-around align-items-center w-100">
            <div className="contats footer-item">
                <ul>
                    <Li><a href="mailto:joaogood@outlook.com" target='_blank' className='footer-link'>Email</a></Li>
                    <Li><a href="https://github.com/JoaoPedro8807" target='_blank' className='footer-link'>GitHub</a></Li>
                    <Li  ><a href="https://www.instagram.com/jpgomes001/?hl=pt-br" target='_blank' className='footer-link'>Instagram</a></Li>
                    <Li className='footer-link' >  </Li>
                    
                </ul>
            </div>

            <div className="about footer-item">
                <ul>    
                    <Li><a href="https://advisor.climatempo.com.br/" target='_blank' className='footer-link'>Api externa</a></Li>
                    <Li><a href="#" className='footer-link'>Mais</a></Li>
                    <Li><a href="#" className='footer-link'>Sobre</a></Li>

                </ul>
            </div>

        </div>
        <p className='text-align-center meu-texto'> <i className='fa fa-wrench'> </i> Feito por<a href="#"></a>João Pedro</p>
    </footer>
)