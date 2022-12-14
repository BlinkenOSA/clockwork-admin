import React, {useEffect, useState} from "react";
import {get} from "../api";

export const UserContext = React.createContext();

export const UserProvider = ({children}) =>{
  const [data, setData] = useState(null)

  useEffect(() =>{
    get('/auth/users/me/').then(res => setData(res.data))
  },[])

  return(
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  )
}
