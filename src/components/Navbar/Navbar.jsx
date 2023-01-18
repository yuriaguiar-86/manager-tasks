import './Navbar.css';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className='header'>
            <h3>Coins</h3>

            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/projects'>Projetos</Link></li>
                    <li><Link to='/contact'>Contato</Link></li>
                    <li><Link to='/company'>Empresa</Link></li>
                </ul>
            </nav>
      </header>
    );
}

export default Navbar;