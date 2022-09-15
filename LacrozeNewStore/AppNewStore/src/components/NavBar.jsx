import '../NavBar.css';
import CartWidget from './CartWidget';
import {Link} from 'react-router-dom';
function NavBar() {
    return (
        <div>
            <nav className="nav">
                <CartWidget></CartWidget>
                <Link className="nav__brand" to='/'>LacrozeNewStore</Link>
                <ul className="nav__menu">
                    <li className="nav__item"><Link className="nav__link" to=''>Inicio</Link></li>
                    <li className="nav__item"><Link className="nav__link" to='category/Hombre'>Hombre</Link></li>
                    <li className="nav__item"><Link className="nav__link" to='category/Mujer'>Mujer</Link></li>
                </ul>
            </nav>
        </div>
    )
}
export default NavBar