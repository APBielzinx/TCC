import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../img/logo.jpg'
import Container from './Container'

function NavBar () {
    return (
        <nav classs={styles.navbar}>
            <Container>
                {/**/}
               <Link to="">
                    <img scr={logo} alt="Up"/>
                </Link> 
               <ul class={styles.list}>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/">Contato</Link>
                </li>
                <li>
                <Link to="/">Empresa</Link>
                </li>
                <li>
                <Link to="/">Home</Link>
                </li>
               </ul>
            </Container>
        </nav>
    )
}

export default NavBar;