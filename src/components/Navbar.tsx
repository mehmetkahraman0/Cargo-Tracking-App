import { useState } from "react"
import { MdLogout, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../redux/store";
import { signOut } from '../redux/slices/userSlice';
import { FaRegUser, FaUsers } from "react-icons/fa"
import { IoCubeSharp, IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
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
    <div className=" bg-gray-100 h-screen sticky top-0 z-10">
      <div className="flex flex-col items-center lg-hidden">
        <button onClick={() => setOpenMenü(true)} className="text-[30px] p-1 pt-2 lg:hidden"><RiMenuFold2Line /></button>
        <hr className="py-4 lg:hidden" />
        <button onClick={() => navigate("/")} className="text-[24px] lg:hidden py-2 px-2 rounded-md hover:bg-gray-200"><IoHome /></button>
        <button onClick={() => { setOpenMenü(true); setIsUserList(true) }} className="text-[24px] lg:hidden py-2 px-2 rounded-md hover:bg-gray-200"><FaUsers /></button>
        <button onClick={() => { setOpenMenü(true); setIsCargoList(true) }} className="text-[24px] lg:hidden py-2 px-2 rounded-md hover:bg-gray-200"><IoCubeSharp /></button>
        <button onClick={() => { setOpenMenü(true); setIsProductList(true) }} className="text-[24px] lg:hidden py-2 px-2 rounded-md hover:bg-gray-200"><AiFillProduct /></button>
      </div>
      <div className={`fixed h-[90vh] top-0 left-0 z-50 w-[320px] bg-gray-100 transition-transform duration-300 ease-in-out ${isOpenMenü ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}>
        <div className="relative w-[320px] h-[100vh] p-4 bg-gray-100">
          <h1 className="text-[28px] font-black tracking-[1px] text-blue-700 flex flex-row justify-between items-center">Tracking Cargo <RiMenuFoldLine onClick={() => setOpenMenü(false)} className="text-[30px] text-black lg:hidden mt-1" /></h1>
          <hr className={currentUser ? "my-3 text-blue-600" : "hidden"} />
          <Link to="/"><p className="flex flex-row items-center pl-2 py-1 rounded-md hover:bg-gray-200 font-light" onClick={() => setOpenMenü(false)}><IoHome />Home </p></Link>
          <div className={["Admin"].includes(currentUser?.status) ? "hidden" : "w-full"}>
            <p className="flex flex-row items-center justify-between gap-1 text-[18px] font-medium tracking-[0.5px] mb-1 pl-2 py-1 rounded-md hover:bg-gray-200" onClick={() => setIsUserList(!isUserList)}> User {isUserList ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}</p>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isUserList ? "max-h-40" : "max-h-0"} `}>
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
          {currentUser
            ?
            <div className={currentUser ? "absolute bottom-5 right-0 px-5 flex flex-row items-center justify-between w-full" : "hidden"}>
              <p className=" flex flex-row items-center gap-2 bg-gray-300 text-[14px] px-2 py-1 rounded-md "><FaRegUser />{currentUser?.userName}</p>
              <button className=" flex flex-row items-center gap-2 bg-red-500 text-white px-2 py-1 text-[14px] rounded-md" onClick={() => logoutHandler()}><MdLogout />Logout</button>
            </div>
            :
            <Link onClick={() => setOpenMenü(false)} to="/user/signin"><li className={!currentUser ? "flex flex-row items-center justify-between pl-2 py-1 rounded-md hover:bg-gray-200 font-light" : "hidden"} >Sign In<MdOutlineKeyboardArrowRight /></li></Link>
          }

        </div >
      </div >
    </div >
  )
}

export default Navbar