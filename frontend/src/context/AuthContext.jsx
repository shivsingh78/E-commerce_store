import React  from 'react'
import { createContext } from 'react'
export const authDataContext = createContext()

function AuthContext({children}) {
     let serverUrl = "http://localhost:8000"
     let value ={
          serverUrl

     }
     const getCurrentUser = async () => {
          try {
               
          } catch (error) {
               
          }
          
     }


  return (
    <div>
     <authDataContext.Provider value={value}>
          {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext