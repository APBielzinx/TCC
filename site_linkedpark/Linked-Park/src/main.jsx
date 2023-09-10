import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/Home.jsx';
import HomeAdm from './routes/HomeAdm.jsx';
import Login from './routes/Login.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import ContactDetails from './routes/ContactDetails.jsx';

//const router = createBrowserRouter([
//  {
//    path: "/",
//    element: <Home />,
//  },
//  {
//    path: "/",
//    element: <Contact />
//  }
//])

const router = createBrowserRouter([
  {

    children: [
        {
          path: "/homeadm",
          element: <HomeAdm />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
