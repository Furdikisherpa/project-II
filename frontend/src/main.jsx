import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Artist from './components/Artist/Artist.jsx'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import Restro  from './components/Restro/Restro.jsx'
import Artist_Login from './components/Login/Artist_Login.jsx'
import Home from './components/Home/Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User_Signup from './components/SignUp/User_Signup.jsx'
import Artist_Signup from './components/SignUp/Artist_Signup.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile.jsx'
import User_Login from './components/Login/User_Login.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[ 
      {
        path:"/",
        element:<Home />
      },
      {
        path:"artist",
        element:<Artist />
      },
      {
        path:"about",
        element:<About />
      },
      {
        path:"contacts",
        element:<Contacts />
      },
      {
        path:"restro",
        element:<Restro />
      },
      {
        path:"signup/User_Signup",
        element:<User_Signup />
      },
      {
        path:"signup/Artist_Signup",
        element:<Artist_Signup />
      },
      {
        path:"login/Artist_login",
        element:<Artist_Login />
      },
      {
        path:"login/User_login",
        element:<User_Login />
      },
      {
        path:"profile",
        element:<Profile />
      },

    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
  router={router}
  />
)
