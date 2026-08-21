/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(() =>
    localStorage.getItem("token"),
  );

  const [userData, setuserData] = useState(null);

  async function getUserData(token) {
  console.log("TOKEN:", token);
  console.log("TOKEN EXISTS:", !!token);

  if (!token) {
    console.log("No token found");
    return;
  }

    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setuserData(data.data.user);

      // console.log(data?.data.user)
    } catch (error) {
      console.error("Get user data error:", error);
    }
  }

  useEffect(() => {
    if (userToken) {
      getUserData(userToken);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setuserToken,
        userData,
        setuserData,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
