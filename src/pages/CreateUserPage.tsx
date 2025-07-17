import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { createUser } from "../redux/slices/userSlice"
import Found404Page from "./Found404Page"
import { useNavigate } from "react-router-dom"

const CreateUserPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [status, setStatus] = useState("User");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [userName, setUserName] = useState("");
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const createUserHandler = async () => {
    if (userName == "" || defaultPassword == "") {
      alert("Bilgileri eksiksiz giriniz.")
      return
    }
    try {
      await dispatch(createUser({ userName, status, defaultPassword })).unwrap()
      alert("kullanıcı oluşturma başarılı.")
      setUserName("");
      setStatus("User");
      navigate("/user/allusers")
    } catch (error: any) {
      alert(error.message)
    }
  }


  return (
    ["Master Admin"].includes(currentUser?.status)
      ? <div className="w-full flex flex-col gap-2 p-5 bg-amber-50">
        <header className="font-semibold text-[20px]">Create User</header>
        <hr />
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="" className="font-medium text-[14px]">User Name</label>
          <input value={userName} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="" className="font-medium text-[14px]">User Default Password</label>
          <input value={defaultPassword} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Name" onChange={(e) => setDefaultPassword(e.target.value)} />
        </div>
        <div className="w-full flex flex-col">
          <label className="text-[14px] font-medium" htmlFor="">User Status</label>
          <select value={status} name="status" id="status" onChange={(e) => setStatus(e.target.value)} className="border rounded-sm p-1 text-[14px]">
            <option value="User">User</option>
            <option value="Official">Official</option>
            <option value="Admin">Admin</option>
            <option value="Master Admin">Master Admin</option>
          </select>
        </div>
        <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-end" onClick={() => createUserHandler()}>Create User</button>
      </div>
      : <Found404Page />
  )
}

export default CreateUserPage
