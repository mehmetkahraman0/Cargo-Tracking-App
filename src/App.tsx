import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateCargoPage from "./pages/CreateCargoPage"
import AddProductPage from "./pages/AddProductPage"
import ProductListPage from "./pages/ProductListPage"
import CargoListPage from "./pages/CargoListPage"
import CargoPage from "./pages/CargoPage"
import Deneme from "./pages/Deneme"
import CargoUpdatePage from "./pages/CargoUpdatePage"

function App() {
  return (
    <div className="flex flex-row justify-between">
      <Navbar />
      <Routes>
        <Route path="/" element={<Deneme />} />
        <Route path="/product-add" element={<AddProductPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/cargo-create" element={<CreateCargoPage />} />
        <Route path="/cargo-list" element={<CargoListPage />} />
        <Route path="/cargo/:id" element={<CargoPage />} />
        <Route path="/cargo/update/:id" element={<CargoUpdatePage />} />

      </Routes>
    </div>
  )
}

export default App
