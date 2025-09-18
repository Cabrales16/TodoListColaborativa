import React, { useState } from 'react';
import api from '../service/api'; // conexión con json-server
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const envia = async (e) => {
    e.preventDefault(); 

    try {
      const response = await api.get(`?correo=${correo}&contrasena=${contrasena}`); // consulta al json-server

      if (response.data.length > 0) {
        localStorage.setItem("admins", JSON.stringify(response.data[0])); // guarda sesión
        navigate("/inicio"); 
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error en el login");
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={envia}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        /><br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}



