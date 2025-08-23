import React, { createContext } from "react";

// ✅ must be lowercase 'a' if you import it as { authDataContext }
export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
