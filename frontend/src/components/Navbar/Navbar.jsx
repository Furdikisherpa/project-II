// src/components/Navbar.jsx
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, } from 'react';
import { AuthContext } from '../../AuthContext';

function Navbar() {
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   // Implement search functionality here
  //   console.log('Search query:', searchQuery);
  //   // For example, navigate to a search results page
  //   // navigate(`/search?query=${searchQuery}`);
  // };

  return (
    <nav className='navbar'>
      <div>
        <a href='/'><img src='' alt='Logo' className='nav-logo' /></a>
      </div>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        
        {isLoggedIn && userRole === 'user' && (
          <li className='navbar-item'>
            <NavLink to='/artist' className={({ isActive }) => isActive ? 'active' : ''}>Artist</NavLink>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li className='navbar-item'>
              <NavLink to='/profile' className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
            </li>
            {userRole === 'user' && (
              <li className='navbar-item'>
                <NavLink to='/booking' className={({ isActive }) => isActive ? 'active' : ''}>Booking</NavLink>
              </li>
            )}

            {userRole === 'artist' && (
              <li className='navbar-item'>
                <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              </li>
            )}
            {/* Search Bar */}
        {/* <li className='navbar-item search-item'>
          <form onSubmit={handleSearch} className='search-form'>
            <input 
              type='text' 
              placeholder='Search...' 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
            {/* <button type='submit' className='search-button'>Search</button> */}
          {/* </form>
        </li>  */}

            <li className='navbar-item'>
              <button onClick={handleLogout} className='logout-button'>Logout</button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li className='navbar-item'>
              <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/signup' className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
            </li>
          </>
        )}

        
      </ul>
    </nav>
  );
}

export default Navbar;
