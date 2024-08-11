import './Footer.css';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <div>
      <footer className="footer"> 
        <div className="container-fluid">
          <nav className="pull-left">  
            <ul className='footer-list'>
              <h3>Contact</h3>
              <li>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
              </li>
              <li>
                <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
              </li>
              <li>
                <NavLink to='/contacts' className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
              </li>
            </ul>
            <ul className='follow-list'>
              <h3>Social Media</h3>
              <li><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
              <li><a href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
              <li><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></li>
            </ul>
            <ul>
              <li><img src="/src/assets/react.svg" alt="" /></li>
            </ul>
            <ul>
              <h3>Address</h3>
              <li>1234, 5th Avenue, New York, NY 10001</li>
            </ul>
          </nav>
        </div>
      </footer>
      <hr />
    </div>
  )
}

export default Footer;
