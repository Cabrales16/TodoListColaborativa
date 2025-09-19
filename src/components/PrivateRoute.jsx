import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Obtenemos de localStorage el objeto "admins"
  // Aquí se guardó la información del usuario al iniciar sesión
  const admins = JSON.parse(localStorage.getItem("admins"));

  // Si existe un usuario en localStorage, renderizamos los children ( o la página protegida)
  // y si NO existe, redirigimos al login (ruta "/")
  return admins ? children : <Navigate to="/" />;
}

export default PrivateRoute;
