import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateCargoPage from "./pages/CreateCargoPage"
import AddProductPage from "./pages/AddProductPage"
import ProductListPage from "./pages/ProductListPage"
import CargoListPage from "./pages/CargoListPage"

function App() {
  return (
    <div className="flex flex-row justify-between">
      <Navbar />
      <Routes>
        <Route path="/product-add" element={<AddProductPage />} />
        <Route path="/product-list" element={<ProductListPage />} />
        <Route path="/cargo-create" element={<CreateCargoPage />} />
        <Route path="/cargo-list" element={<CargoListPage />} />
      </Routes>
    </div>
  )
}

export default App
