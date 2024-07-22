import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Artist from './components/Artist/Artist.jsx'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import Restro  from './components/Restro/Restro.jsx'
import Artist_Login from './components/Login/Artist_Login.jsx'
import Artist_Signup from './components/SignUp/Artist_Signup.jsx'
import Home from './components/Home/Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        path:"signup",
        element:<Artist_Signup />
      },
      {
        path:"login",
        element:<Artist_Login />
      },
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
  router={router}
  />
)
