import { useState } from "react"
import { MdLogout, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { type AppDispatch, type RootState } from "../redux/store";
import { signOut } from '../redux/slices/userSlice';
import { FaRegUser } from "react-icons/fa"
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isCargoList, setIsCargoList] = useState(false)
  const [isProductList, setIsProductList] = useState(false)
  const [isUserList, setIsUserList] = useState(false)

  const [isOpenMenü, setOpenMenü] = useState(false)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  console.log(currentUser)

  const logoutHandler = async () => {
    try {
      await dispatch(signOut({ userName: currentUser.userName })).unwrap()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-gray-100 h-screen sticky top-0 z-10">
      <button onClick={() => setOpenMenü(true)} className="text-[30px] p-1 pt-4 lg:hidden"><RiMenuFold2Line /></button>
      <div className={`fixed top-0 left-0 z-50 w-[320px] bg-gray-100 transition-transform duration-300 ease-in-out ${isOpenMenü ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}>
        <div className="w-[320px] h-[100vh] p-4 bg-gray-100">
          <h1 className="text-[28px] font-black tracking-[1px] text-blue-700 flex flex-row justify-between items-center">Tracking Cargo <RiMenuFoldLine onClick={() => setOpenMenü(false)} className="text-[30px] text-black lg:hidden mt-1" /></h1>
          <hr className="my-3 text-blue-600" />
          <div className={currentUser ? " flex flex-row items-center justify-between" : "hidden"}>
            <p className=" flex flex-row items-center gap-2 bg-blue-500 text-[14px] px-2 py-1 rounded-md text-white"><FaRegUser />{currentUser?.userName}</p>
            <button className=" flex flex-row items-center gap-2 bg-red-500 text-white px-2 py-1 text-[14px] rounded-md" onClick={() => logoutHandler()}><MdLogout />Logout</button>
          </div>
          <hr className={currentUser ? "my-3 text-blue-600" : "hidden"} />
          <Link to="/"><p className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" onClick={() => setOpenMenü(false)}> Home Page <MdOutlineKeyboardArrowRight /></p></Link>
          <div className={["Admin"].includes(currentUser?.status) ? "hidden" : "w-full"}>
            <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsUserList(!isUserList)}> User {isUserList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isUserList ? "max-h-40" : "max-h-0"} `}>
              <Link onClick={() => setOpenMenü(false)} to="/user/signin"><li className={!currentUser ? "flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" : "hidden"} >Sign In<MdOutlineKeyboardArrowRight /></li></Link>
              {["Master Admin"].includes(currentUser?.status) ? <Link onClick={() => setOpenMenü(false)} to="/user/create"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Create User<MdOutlineKeyboardArrowRight /></li></Link> : ""}
              {["Master Admin"].includes(currentUser?.status) ? <Link onClick={() => setOpenMenü(false)} to="/user/allusers"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">All User<MdOutlineKeyboardArrowRight /></li></Link> : ""}
              <hr className="my-3 text-blue-600" />
            </div>
          </div>
          {currentUser
            ? (<>
              <div className="w-full">
                <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsCargoList(!isCargoList)}> Cargo {isCargoList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCargoList ? "max-h-40" : "max-h-0"}`}>
                  {["Master Admin", "Admin", "Official"].includes(currentUser.status) ? <Link onClick={() => setOpenMenü(false)} to="/cargo-list"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Cargo List <MdOutlineKeyboardArrowRight /></li></Link> : ""}
                  {["Master Admin", "Admin", "Official"].includes(currentUser.status) ? <Link onClick={() => setOpenMenü(false)} to="/cargo-create"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" >Create Cargo<MdOutlineKeyboardArrowRight /></li></Link> : ""}
                  {["Master Admin", "Admin", "Official", "User"].includes(currentUser.status) ? <Link onClick={() => setOpenMenü(false)} to="/tracking-cargo/"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Tracking Cargo<MdOutlineKeyboardArrowRight /></li></Link> : ""}
                  <hr className="my-3 text-blue-600" />
                </div>
              </div>
              <div className="w-full ">
                <div className="w-full">
                  <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsProductList(!isProductList)}>Product {isProductList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductList ? "max-h-40" : "max-h-0"}`}>
                    {["Master Admin", "Admin"].includes(currentUser.status) ? <Link onClick={() => setOpenMenü(false)} to="/product-list"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" >Product List<MdOutlineKeyboardArrowRight /></li></Link> : ""}
                    {currentUser?.status == "Master Admin" ? <Link onClick={() => setOpenMenü(false)} to="/product-add"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Add Product<MdOutlineKeyboardArrowRight /></li></Link> : ""}
                    <hr className="my-3 text-blue-600" />
                  </div>
                </div>
              </div>
            </>)
            : (<Link onClick={() => setOpenMenü(false)} to="/tracking-cargo/"><li className="flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light">Tracking Cargo<MdOutlineKeyboardArrowRight /></li></Link>)
          }
        </div >
      </div >
    </div >
  )
}

export default Navbar