/* eslint-disable no-unused-vars */
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import PostDetails from "./Components/PostDetails/PostDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CounterContextProvider } from "./Context/CounterContext";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectRoute from "./ProtectRoute/ProtectRoute";
import ProtectAuth from "./ProtectAuth/ProtectAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer, toast } from "react-toastify";

import { useNetworkState } from "react-use";
import Offline from "./Components/Offline/Offline";

const queryClient = new QueryClient();

function App() {
  let { online } = useNetworkState();

  let route = createBrowserRouter([
    {
      path: "/",
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
        {
          path: "postDetails/:id",
          element: (
            <ProtectRoute>
              <PostDetails />
            </ProtectRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      {!online && (
        <div className="h-screen bg-gray-300 flex justify-center items-center fixed  z-50 inset-0">
          <Offline />
        </div>
      )}

      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={route} />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
