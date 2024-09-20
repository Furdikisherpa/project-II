import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Artist from './components/Artist/Artist.jsx';
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
import BookingTable from './components/Booking/BookingTable.jsx';
// import { element } from 'prop-types';
import DashHome from './Dashboard/Home.jsx';
import Update from './Dashboard/Update/Update.jsx';
import Upload from './Dashboard/Upload/Upload.jsx';
import Request from './Dashboard/Request/Request.jsx';
import Review from './Dashboard/review.jsx';

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
        path: 'artist/:artistId',
        element: <Profile />,
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
        element: <Profile />,
      },
      {
        path: 'booking',
        element: <BookingTable />,
      },
      {
        path: '',
        element: ''
      },

      // Dashboard and its nested routes
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'home',
            element: <DashHome />,
          },
          {
            path: 'upload',
            element: <Upload />,
          },
          {
            path: 'update',
            element: <Update />,
          },
          {
            path: 'request',
            element: <Request />,
          },
          {
            path: 'review ',
            element: <Review />,
          },
        ],
      },
    ],
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider> {/* Wrap the RouterProvider with AuthProvider */}
    <RouterProvider router={router} />

  </AuthProvider>
);