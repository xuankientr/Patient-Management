import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Spin } from "antd"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute