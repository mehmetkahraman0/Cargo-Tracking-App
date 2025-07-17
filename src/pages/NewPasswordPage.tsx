import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { signUp, getUser } from '../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";

const NewPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [defaultPassword, setDefaultPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const user = useSelector((state: RootState) => state.user.user)

  const handleUserSignUp = async () => {
    if (!userName || !defaultPassword || !newPassword) {
      alert("Bilgileri eksiksiz giriniz");
      return;
    }
    try {
      if (user?.password) {
        alert("Kullanıcı önceden şifre oluşturmuş.");
        return;
      }
      await dispatch(signUp({ userName, password:newPassword, defaultPassword })).unwrap();
      alert("Kullanıcı kayıt edildi. Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/");
    } catch (error) {
      alert("Kullanıcı şifresi kayıt edilemedi");
      console.error("SignUp Error:", error);
    }
  };

  useEffect(() => {
    dispatch(getUser({ userName })).unwrap().catch(error => {
      console.log(error)
    })
  }, [dispatch, defaultPassword])



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-amber-200">
      <div className="bg-amber-100 h-[350px] w-[280px] md:w-[350px] p-5 m-5 flex flex-col gap-3 rounded-md shadow-2xl">
        <hr />
        <header className="font-semibold text-[20px] self-center tracking-[0.5px]">New Current Password</header>
        <hr className="mb-5" />
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">User Name</label>
          <input className="border rounded-sm text-[14px] pl-1" type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">Default Password</label>
          <input className="border rounded-sm text-[14px] pl-1" type="password" onChange={(e) => setDefaultPassword(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">New Password</label>
          <input className="border rounded-sm text-[14px] pl-1" type="password" onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-center" onClick={() => handleUserSignUp()}>Save</button>
      </div>
    </div>
  )
}

export default NewPasswordPage
