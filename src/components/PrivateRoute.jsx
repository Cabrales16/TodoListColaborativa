import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const admins = localStorage.getItem("admins");
  return admins ? children : <Navigate to="/" />; //el ? ase de else y if 
}

export default PrivateRoute;
