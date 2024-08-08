import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div>
        <a href='/'><img src='' alt='Logo' className='nav-logo' /></a> 
      </div>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/artist' className={({ isActive }) => isActive ? 'active' : ''}>Artist</NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/contacts' className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
        </li>

        {isLoggedIn ? (
          <li className='navbar-item'>
            <NavLink to='/profile' className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          </li>
        ) : (
          <>
            <li className='navbar-item'>
              <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/signup' className={({ isActive }) => isActive ? 'active' : ''}>SignUp</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
