import './Navbar.css';
import { NavLink } from "react-router-dom"
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
        <li className='navbar-item'><NavLink to='/login' activeClassName="active">Login</NavLink></li>
        <li className='navbar-item'><NavLink to='/signup' activeClassName="active">Register</NavLink></li>
        

        </ul>
    </nav>
  )
}

export default Navbar
