import Logo from '../components/Logo';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Main(props){    
    return (
        <div className="main">
            <Logo />
            <Header />
            <Nav/>
            {props.content}
            <Footer />
        </div>
    )
}
