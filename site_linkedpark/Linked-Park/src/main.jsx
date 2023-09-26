import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeAdm from './routes/HomeAdm.jsx';
import Login from './routes/Login.jsx';
import { ChakraProvider } from "@chakra-ui/react";
import HomeAdmParque from './routes/HomeAdmParque.jsx';
import AppChat from './chat-app/src/AppChat.jsx'

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
          element: <App />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/homeadmparque",
          element: <HomeAdmParque />,
        },
        {
          path: "/chat",
          element: <AppChat />,
        },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
