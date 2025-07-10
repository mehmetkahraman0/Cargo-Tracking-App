import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { signUp, getUser } from '../redux/slices/userSlice';

const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  let signUpError = useSelector((state: RootState) => state.user.signUpError)
  const user = useSelector((state: RootState) => state.user.user)


  const handleUserSignUp = async () => {
    if (userName && password && verifyPassword) {
      if (user?.password) {
        alert("Kullanıcı önceden şifre oluşturmuş.")
        return
      } else {
        if (password === verifyPassword) {
          dispatch(signUp({ userName, password })).unwrap
          if (!signUpError) {
            alert("kullanıcı kayıt edildi")
          } else {
            alert("kullanıcı şifresi kayıt edilemedi")
          }
        }
        console.log(signUpError)
      }
    } else {
      alert("bilgileri eksiksiz giriniz")
    }
    signUpError = undefined
  }

  useEffect(() => {
    dispatch(getUser({ userName })).unwrap()
  }, [dispatch, password])



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-amber-200">
      <div className="bg-amber-100 h-[350px] w-[280px] md:w-[350px] p-5 m-5 flex flex-col gap-3 rounded-md shadow-2xl">
        <hr />
        <header className="font-semibold text-[20px] self-center tracking-[0.5px]">Sign Up</header>
        <hr className="mb-5" />
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">User Name</label>
          <input className="border rounded-sm text-[14px] pl-1" type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">Password</label>
          <input className="border rounded-sm text-[14px] pl-1" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-[14px] font-medium">Verify Password</label>
          <input className="border rounded-sm text-[14px] pl-1" type="password" onChange={(e) => setVerifyPassword(e.target.value)} />
        </div>
        <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-center" onClick={() => handleUserSignUp()}>Save</button>
      </div>
    </div>
  )
}

export default SignUpPage
