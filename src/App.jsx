import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CounterContextProvider } from "./Context/CounterContext";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

function App() {
  let route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "profile", element: <Profile /> },
        { path: "home", element: <Home /> },
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
