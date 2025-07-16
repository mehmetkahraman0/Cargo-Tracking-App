import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateCargoPage from "./pages/CreateCargoPage"
import AddProductPage from "./pages/AddProductPage"
import ProductListPage from "./pages/ProductListPage"
import CargoListPage from "./pages/CargoListPage"
import CargoPage from "./pages/CargoPage"
import CargoUpdatePage from "./pages/CargoUpdatePage"
import CreateUserPage from "./pages/CreateUserPage"
import SignUpPage from "./pages/NewPasswordPage"
import SignInPage from "./pages/SignInPage"
import AllUsersPage from "./pages/AllUsersPage"
import HomePage from "./pages/HomePage"
import TrackingCargoPage from "./pages/TrackingCargoPage"
import UpdateUserPage from "./pages/UpdateUserPage"

function App() {
  return (
    <div className="flex flex-row justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-add" element={<AddProductPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/cargo-create" element={<CreateCargoPage />} />
        <Route path="/cargo-list" element={<CargoListPage />} />
        <Route path="/cargo/:id" element={<CargoPage />} />
        <Route path="/cargo/update/:id" element={<CargoUpdatePage />} />
        <Route path="/user/create" element={<CreateUserPage />} />
        <Route path="/user/signup" element={<SignUpPage />} />
        <Route path="/user/signin" element={<SignInPage />} />
        <Route path="/user/allusers" element={<AllUsersPage />} />
        <Route path="/tracking-cargo" element={<TrackingCargoPage />} />
        <Route path="/user/update/:username" element={<UpdateUserPage />} />

      </Routes>
    </div>
  )
}

export default App
