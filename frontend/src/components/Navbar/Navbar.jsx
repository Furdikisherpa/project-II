import './Navbar.css';
import { NavLink } from "react-router-dom"
// import Button from 'react-bootstrap/Button';

const Navbar = () => {
  return (
    <nav className='navbar'>
     <div>
     <a href="/"><img src="" alt="Logo" className="nav-logo"/></a> 
     </div>
      <ul className='navbar-list'>
        <li className='navbar-item'><NavLink to='/' activeClassName="active">Home</NavLink></li>
        <li className='navbar-item'><NavLink to='/about' activeClassName="active">About</NavLink></li>
        <li className='navbar-item'><NavLink to='/artist' activeClassName="active">Artist</NavLink></li>
        <li className='navbar-item'><NavLink to='/restro' activeClassName="active">Restro</NavLink></li>
        <li className='navbar-item'><NavLink to='/contacts' activeClassName="active">Contact</NavLink></li>
        <li className='navbar-item'><NavLink to='/artistlogin' activeClassName="active">Login</NavLink></li>
        <li className='navbar-item'><div className="dropdown">
          <button>Profile</button>
          <div className="dropdown-options">
          <NavLink to='/signup/Artist_Signup' activeClassName="active">Artist</NavLink>
          <NavLink to='/signup/User_Signup' activeClassName="active">User</NavLink>
          </div>
        </div>
        </li>

        </ul>
    </nav>
  )
}

export default Navbar
