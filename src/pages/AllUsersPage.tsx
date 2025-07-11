import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUSer, getAllUser } from '../redux/slices/userSlice'
import { type AppDispatch, type RootState } from '../redux/store'
import { Table, type TableColumnsType } from 'antd'
import type { User } from '../models/User'
import Found404Page from './Found404Page'

const AllUsersPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.user.allUSer)
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    useEffect(() => {
        dispatch(getAllUser()).unwrap()
    }, [])

    const columns: TableColumnsType<User> = [
        {
            title: 'User Name',
            dataIndex: "userName",
            key: 'productName',
        },
        {
            title: 'Status',
            dataIndex: "status",
            key: 'serialNo',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (password: string) => {
                return password ? <p>Registered ✅</p> : <p>Unregistered ❌</p>
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: User) => (
                <div className='flex gap-8'>
                    <button className='border rounded-md bg-red-500 hover:bg-red-600 transition px-2 py-1 text-white' onClick={() => handleDeleteUser(record.userName)}>Delete</button>
                </div>
            ),
        },
    ]

    const handleDeleteUser = async (userName: string) => {
        await dispatch(deleteUSer({ userName })).unwrap()
        window.location.reload()
    }

    return (
          ["Master Admin"].includes(currentUser?.status)
            ? <div className='w-full p-5 flex flex-col '>
                <Table
                    columns={columns}
                    dataSource={users!}
                    pagination={false}
                    rowKey={(record) => record.userName || record.status || Math.random().toString()}
                    size="small"
                />
            </div>
            : <Found404Page />
    )
}

export default AllUsersPage
