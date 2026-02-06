import { Navigate, Outlet } from "react-router-dom"

function RedirectAuthUser() {
    const token = localStorage.getItem("token")
    
    return !token ? <Outlet /> : <Navigate to='/' />
}

export default RedirectAuthUser