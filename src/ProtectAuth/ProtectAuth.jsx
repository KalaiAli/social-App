import { Navigate } from "react-router-dom";

export default function ProtectAuth({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
