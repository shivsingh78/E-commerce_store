import React, { Children, createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
     let serverUrl = "https://e-store-backend-fqni.onrender.com"
     let value = {
          serverUrl,
     }
     
  return (
    <div>
     <authDataContext.Provider value={value} >
          {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
