import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function PublicRoute({ children }) {
  const { userToken } = useContext(AuthContext);

  if (userToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
