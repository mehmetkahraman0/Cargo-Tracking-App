import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import CreateCargoPage from "./pages/CreateCargoPage"
import AddProductPage from "./pages/AddProductPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>        
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/create-cargo" element={<CreateCargoPage />} />
      </Routes>
    </>
  )
}

export default App
