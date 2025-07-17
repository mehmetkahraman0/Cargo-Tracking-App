import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Found404Page from "./Found404Page";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { getUser, updateUser } from '../redux/slices/userSlice';
import type { User } from '../models/User';

const UpdateUserPage = () => {
    const { username } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const [userName, setUserName] = useState(user?.userName);
    const [defaultPassword, setDefaultPassword] = useState(user?.defaultPassword);
    const [status, setStatus] = useState(user?.status);
    const [password, setPassword] = useState(user?.password);
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const updateHandler = async () => {
        if (!user) return
        if (!userName) return
        if (!status) return
        try {
            const updatedUser: User = {
                id: user.id,
                userName,
                password,
                defaultPassword,
                status
            }
            await dispatch(updateUser(updatedUser)).unwrap()
            alert("update işlemi başarılı.")
            navigate("/user/allusers")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const userFetch = async () => {
            if (!username) return;
            try {
                await dispatch(getUser({ userName: username })).unwrap()

            } catch (err) {
                console.error("Kullanıcı alınamadı ", err)
            }
        }
        userFetch()
    }, [username])

    useEffect(() => {
        if (user) {
            setUserName(user.userName)
            setDefaultPassword(user.defaultPassword)
            setStatus(user.status || "")
            setPassword(user.password)
        }
    }, [user])
    return (
        ["Master Admin"].includes(currentUser?.status)
            ? <div className="w-full flex flex-col gap-2 p-5 bg-amber-100">
                <header className="font-semibold text-[20px]">Update User</header>
                <hr />
                <div className="w-full flex flex-col gap-1">
                    <label htmlFor="" className="font-medium text-[14px]">User Name</label>
                    <input value={userName} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label htmlFor="" className="font-medium text-[14px]">User Default Password</label>
                    <input value={defaultPassword} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Default Password" onChange={(e) => setDefaultPassword(e.target.value)} />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label htmlFor="" className="font-medium text-[14px]">User Password</label>
                    <input value={password} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Password" onChange={(e) => setPassword(e.target.value)} />
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
                <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-end" onClick={() => updateHandler()}>Save Update</button>
            </div>
            : <Found404Page />

    )
}

export default UpdateUserPage
