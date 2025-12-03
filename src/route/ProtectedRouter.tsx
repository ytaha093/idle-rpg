import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Wiki from "./Wiki";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { JSX } from "react";

// checks if user logged in and redirects to login 
function ProtectedRoute({ element }: { element: JSX.Element }) {
  const auth = useSelector((state: RootState) => state.auth)
  // if logged in redirect login to game
  // if not logged in, redirect to login
  if (element.type.name === "Login") {
    return auth.loggedIn ? <Navigate to="/game" replace /> : <Login />
  } else {
    return auth.loggedIn ? element : <Navigate to="/" replace />
  }
}

const ProtectedRouter = createBrowserRouter([
  { path: "/wiki", element: <Wiki /> },
  { path: "/game", element: <ProtectedRoute element={<Dashboard />} /> },
  { path: "/", element: <ProtectedRoute element={<Login />} /> },
  // redirects all unknown routes to "/"
  { path: "*", element: <Navigate to="/game" replace /> },
]);

export default ProtectedRouter