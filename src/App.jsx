import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.jsx';
import Inicio from './pages/inicio.jsx'
import Login from './pages/login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      {/* Contenedor de Toasts en la esquina superior izquierda */}
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  ) 
}
