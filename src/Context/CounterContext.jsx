/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const CounterContext = createContext();

export function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const[userName,setuserName]=useState('ahmed')

  return (
    <CounterContext.Provider
      value={{ counter,  userName,setCounter,setuserName}}
    >
     {children}
    </CounterContext.Provider>
  );
}
