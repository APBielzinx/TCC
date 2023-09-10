import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeAdm from './pages/HomeAdm'

const AppRoutes = () => {
    return (    
        <Router>
            <Routes>
                <Route path="/homeadm" element={<HomeAdm/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes