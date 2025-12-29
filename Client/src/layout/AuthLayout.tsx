import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
        <h1>Auth Layout</h1>
        <Outlet />
    </div>
  )
}

export default AuthLayout