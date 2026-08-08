import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import ChangePassword from "./Components/ChangePassword/ChangePassword";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CounterContextProvider } from "./Context/CounterContext";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectRoute from "./ProtectRoute/ProtectRoute";
import ProtectAuth from "./ProtectAuth/ProtectAuth";

function App() {
  let route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectAuth>
              <Register />
            </ProtectAuth>
          ),
        },
        {
          path: "change-password",
          element: (
            <ProtectRoute>
              <ChangePassword />
            </ProtectRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={route} />
        </CounterContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
