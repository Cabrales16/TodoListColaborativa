import React, { useState } from "react";
import api from "../service/api"; // conexión con json-server
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const envia = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(
        `?correo=${correo}&contrasena=${contrasena}`
      );

      if (response.data.length > 0) {
        localStorage.setItem("admins", JSON.stringify(response.data[0]));
        navigate("/inicio");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error en el login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inicio de Sesión
        </h2>

        <form onSubmit  ={envia} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Recordarme
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Entrar
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      </div>
    </div>
  );
}
