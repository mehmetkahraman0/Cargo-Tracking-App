import { useState } from "react"
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCargoList, setIsCargoList] = useState(false)
  const [isProductList, setIsProductList] = useState(false)
  const [isOpenMenü, setOpenMenü] = useState(false)




  return (
    <div className="bg-gray-100 h-screen">
      <button onClick={() => setOpenMenü(true)} className="text-[30px] p-1 pt-4 lg:hidden"><RiMenuFold2Line /></button>
      <div className={`fixed top-0 left-0 z-50 w-[320px] bg-gray-100 transition-transform duration-300 ease-in-out ${isOpenMenü ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}>
        <div className="w-[320px] h-[100vh] p-4 bg-gray-100">
          <h1 className="text-[28px] font-black tracking-[1px] text-blue-700 flex flex-row justify-between items-center">Tracking Cargo <RiMenuFoldLine onClick={() => setOpenMenü(false)} className="text-[30px] text-black lg:hidden mt-1" /></h1>
          <div className="w-full ">
            <div className="w-full">
              <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsCargoList(!isCargoList)}> Cargo {isCargoList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
              <ul className={`overflow-hidden transition-all duration-300 ease-in-out ${isCargoList ? "max-h-40" : "max-h-0"}`}>
                <Link to="/cargo-list"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Cargo List <MdOutlineKeyboardArrowRight /></li></Link>
                <Link to="/cargo-create"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" >Create Cargo<MdOutlineKeyboardArrowRight /></li></Link>
                <Link to="/tracking-cargo/"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Tracking Cargo<MdOutlineKeyboardArrowRight /></li></Link>
              </ul>
            </div>
            <div className="w-full">
              <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsProductList(!isProductList)}>Product {isProductList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
              <ul className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductList ? "max-h-40" : "max-h-0"}`}>
                <Link to="/product-list"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" >Product List<MdOutlineKeyboardArrowRight /></li></Link>
                <Link to="/product-add"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Add Product<MdOutlineKeyboardArrowRight /></li></Link>
              </ul>
            </div>
          </div>
        </div >
      </div >
    </div >
  )
}

export default Navbar
