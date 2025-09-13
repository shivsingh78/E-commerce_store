import React, { createContext } from "react";

// ✅ must be lowercase 'a' if you import it as { authDataContext }
export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "https://e-store-backend-fqni.onrender.com";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
