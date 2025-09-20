import React, { useState } from "react";
import api from "../service/api"; // Cliente de conexión con json-server (para consultas a la API)
import { useNavigate } from "react-router-dom"; // Hook para redirigir entre páginas
import { toast } from "react-toastify"; // Para mostrar notificaciones (éxito, error, etc.)

export default function Login() {
  // Estados locales para manejar los valores de los inputs y mensajes de error
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para navegar a otra ruta si el login es exitoso

  // Función que se ejecuta al enviar el formulario
  const envia = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      // Petición GET al backend (json-server) para buscar un admin con ese correo y contraseña
      const response = await api.get(
      `/admins?correo=${correo}&contrasena=${contrasena}` //aqui traemos los datos de los admins especificamente
      );

      // Si encuentra al menos un usuario, significa que las credenciales son válidas
      if (response.data.length > 0) {
        // Guardamos el usuario autenticado en localStorage (para mantener sesión)
        localStorage.setItem("admins", JSON.stringify(response.data[0]));

        if (correo === "" || contrasena === "") {
        setError("Por favor, complete todos los campos");
        toast.error("Por favor, complete todos los campos");
        
      } else {
        // Redirige a la página de inicio
        navigate("/inicio");
        toast.success("Login exitoso"); // Muestra notificación de éxito
      }

      } else {
        // Si no encuentra coincidencias, muestra error de credenciales
        setError("Credenciales incorrectas");
        toast.error("Credenciales incorrectas"); // Muestra notificación de error
        
        // Si no encuentra datos
        
        
      } 
    } catch {
      // Si hay un fallo en la petición o en el servidor
      setError("Error en el login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      {/* Contenedor de la tarjeta de login */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inicio de Sesión
        </h2>

        {/* Formulario de login */}
        <form onSubmit={envia} className="space-y-4">
          {/* Input de correo */}
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          {/* Input de contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Entrar
          </button>
        </form>

        {/* Mensaje de error si existe */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}