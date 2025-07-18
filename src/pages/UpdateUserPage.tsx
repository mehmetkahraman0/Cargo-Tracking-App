import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../redux/store";
import { setOpen, updateUser } from '../redux/slices/userSlice';
import type { User } from '../models/User';
import { Input, Select } from 'antd';
import { useAlert } from '../functions/useAlert';

type UpdateUserProps = {
    user: User
}

const UpdateUserPage = ({ user }: UpdateUserProps) => {
    const { successAlert, contextHolder } = useAlert()
    const dispatch = useDispatch<AppDispatch>()
    const [userName, setUserName] = useState("");
    const [defaultPassword, setDefaultPassword] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");
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
            successAlert("update işlemi başarılı.")
            dispatch(setOpen())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            setUserName(user.userName)
            setDefaultPassword(user.defaultPassword || "")
            setStatus(user.status || "")
            setPassword(user.password || "")
        }
    }, [user])

    return (
        < div className="w-full flex flex-col gap-2 p-5 mt-6" >
            {contextHolder}
            <header className="font-semibold text-[20px]">Update User</header>
            <hr />
            <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="font-medium text-[14px]">User Name</label>
                <Input value={userName} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="font-medium text-[14px]">User Default Password</label>
                <Input value={defaultPassword} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Default Password" onChange={(e) => setDefaultPassword(e.target.value)} />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label htmlFor="" className="font-medium text-[14px]">User Password</label>
                <Input value={password} type="text" className="border rounded p-1 text-[14px]" placeholder="Enter User Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="w-full flex flex-col">
                <label className="text-[14px] font-medium" htmlFor="">User Status</label>
                <Select
                    className='w-full'
                    defaultValue="User"
                    onChange={(e) => setStatus(e)}
                    options={[
                        { value: 'User', label: 'User' },
                        { value: 'Official', label: 'Official' },
                        { value: 'Admin', label: 'Admin' },
                        { value: 'Master Admin', label: 'Master Admin' },
                    ]}
                />
            </div>
            <button className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-[14px] cursor-pointer self-end mt-10" onClick={() => updateHandler()}>Save Update</button>
        </div >
    )
}

export default UpdateUserPage
