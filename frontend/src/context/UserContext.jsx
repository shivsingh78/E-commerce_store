import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext"; // ✅ must match export

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/auth/getcurrentuser", {
        withCredentials: true,
      });
      setUserData(res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error fetching user", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
