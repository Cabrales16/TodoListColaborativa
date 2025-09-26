import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.jsx';
import Inicio from './pages/inicio.jsx'
import Login from './pages/login.jsx';



export default function App() { 
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/inicio" 
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
          />
      </Routes>
    
    </BrowserRouter>
  ) 
} 