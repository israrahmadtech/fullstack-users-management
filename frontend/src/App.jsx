import { Toaster } from "react-hot-toast"
import UserList from "./pages/UserList/UserList"
import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/users" element={<UserList />} />
      </Routes>
    </>
  )
}

export default App