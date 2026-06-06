import { createContext, useState, useContext } from 'react'

// Create the context (like creating a shared whiteboard)
const AuthContext = createContext()

// This wraps your whole app and makes user data available everywhere
export const AuthProvider = ({ children }) => {
  // Load user from localStorage so they stay logged in after refresh
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem('userInfo')
    return saved ? JSON.parse(saved) : null
  })

  const login = (data) => {
    setUserInfo(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const logout = () => {
    setUserInfo(null)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)