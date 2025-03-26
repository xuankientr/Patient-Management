import { createContext, useState, useEffect, useContext } from "react"
import { message } from "antd"
import { login as apiLogin } from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user")
      const loginTime = localStorage.getItem("loginTime")

      if (storedUser && loginTime) {
        const parsedUser = JSON.parse(storedUser)
        const now = new Date().getTime()

        const fiveMinutes = 5 * 60 * 1000

        if (now - Number.parseInt(loginTime) < fiveMinutes) {
          setUser(parsedUser)
        } else {
          localStorage.removeItem("user")
          localStorage.removeItem("loginTime")
          setUser(null)
          message.info("Your session has expired. Please log in again.")
        }
      }
      setLoading(false)
    }

    checkAuthStatus()

    const intervalId = setInterval(checkAuthStatus, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const loginUser = async (email, password) => {
    setLoading(true)
    setAuthError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = await apiLogin(email, password)

      setUser(userData)
      const loginTime = new Date().getTime()
      localStorage.setItem("loginTime", loginTime.toString())
      localStorage.setItem("user", JSON.stringify(userData))

      setLoading(false)
      return true
    } catch (error) {
      setAuthError(error.message || "Login failed. Please try again.")
      setLoading(false)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("loginTime")


    message.success("Logout successful!")
  }

  const refreshSession = () => {
    if (user) {
      const loginTime = new Date().getTime()
      localStorage.setItem("loginTime", loginTime.toString())
      return true
    }
    return false
  }

  const value = {
    user,
    login: loginUser,
    logout,
    loading,
    authError,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthContext }