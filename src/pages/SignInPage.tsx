import { useState } from "react"
import { useDispatch } from "react-redux"
import { type AppDispatch } from "../redux/store"
import { getUser, signIn } from '../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleUserSignUp = async () => {
        if (!userName || !password) {
            alert("bilgileri eksiksiz giriniz");
            return;
        }

        try {
            const userEx = await dispatch(getUser({ userName })).unwrap();
            if (userEx?.password === password) {
                await dispatch(signIn({ userName, password })).unwrap();
                alert("Kullanıcı girişi yapıldı.");
                navigate("/");
                window.location.reload();
                return;
            }

            if (userEx?.defaultPassword === password && !userEx?.password) {
                await dispatch(signIn({ userName, defaultPassword: password })).unwrap();
                alert("Kullanıcı girişi yapıldı.");
                navigate("/user/signup");
                window.location.reload();
                return;
            }

            alert("Şifre uyuşmuyor.");
        } catch (error) {
            console.log(error);
            alert("Kullanıcı bulunamadı veya giriş hatası.");
        }
    };


    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-amber-200">
            <div className="bg-amber-100 h-[280px] w-[280px] md:w-[350px] p-5 m-5 flex flex-col gap-3 rounded-md shadow-2xl">
                <hr />
                <header className="font-semibold text-[20px] self-center tracking-[0.5px]">Sign In</header>
                <hr className="mb-5" />
                <div className="flex flex-col">
                    <label htmlFor="" className="text-[14px] font-medium">User Name</label>
                    <input className="border rounded-sm text-[14px] pl-1" type="text" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="text-[14px] font-medium">Password</label>
                    <input className="border rounded-sm text-[14px] pl-1" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-center" onClick={() => handleUserSignUp()}>Save</button>
            </div>
        </div>
    )
}

export default SignInPage