import { Toaster } from "react-hot-toast"
import UserList from "./pages/UserList/UserList"
import { Navigate, Route, Routes } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes"
import RedirectAuthUser from "./RedirectAuthUser/RedirectAuthUser"

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<UserList />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<RedirectAuthUser />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App