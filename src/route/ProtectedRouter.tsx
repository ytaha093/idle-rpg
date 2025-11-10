import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Wiki from "./Wiki";
import { useContext, type JSX } from "react";
import { AuthContext } from "../context/AuthContext";


// checks if user logged in and redirects to login 
function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { isLogged } = useContext(AuthContext)
  return isLogged ? element : <Navigate to="/login" replace />
}


const ProtectedRouter = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/wiki", element: <ProtectedRoute element={<Wiki />} /> },
  { path: "/", element: <ProtectedRoute element={<Dashboard />} /> },
  // redirects all unknown routes to "/"
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default ProtectedRouter