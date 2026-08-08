/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setuserToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // useEffect(()=> {
  //    if  (localStorage.getItem('token')) {
  //     setuserToken(localStorage.getItem('token'))
  //    }
  // },[])
  // useEffect

  return (
    <AuthContext.Provider value={{ userToken, setuserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
