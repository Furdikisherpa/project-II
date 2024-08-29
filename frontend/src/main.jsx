import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Artist from './components/Artist/Artist.jsx';
import About from './components/About/About.jsx';
import Contacts from './components/Contacts/Contacts.jsx';
import Home from './components/Home/Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile.jsx';
import { AuthProvider } from './AuthContext.jsx'; // Correct import
import Login from './components/Login/Login.jsx';
import Signup from './components/SignUp/signup.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import './styles.css/fonts.css'
import UpdateArtistForm from './components/Profile_Update/ProfileUpdateForm.jsx';
import BookingTable from './components/Booking/BookingTable.jsx';
// import { element } from 'prop-types';
import dashHome from './Dashboard/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'artist',
        element: <Artist />,
      },
      {
      path:"/artist/:artistId",
      element:<Profile />
    },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
  
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'booking',
        element: <BookingTable />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/home',
        element: <dashHome />
      },
      {
        path: 'UpdateProfile',
        element: <UpdateArtistForm />
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> {/* Wrap the RouterProvider with AuthProvider */}
    <RouterProvider router={router} />
  </AuthProvider>
);