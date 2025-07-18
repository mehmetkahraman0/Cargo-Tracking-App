import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUSer, getAllUser, setOpen } from '../redux/slices/userSlice'
import { type AppDispatch, type RootState } from '../redux/store'
import { Modal, Button, Table, type TableColumnsType } from 'antd'
import type { User } from '../models/User'
import UpdateUserPage from './UpdateUserPage'

const AllUsersPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: RootState) => state.user.allUSer)
    const open = useSelector((state: RootState) => state.user.open)

    const [selectedUser, setSelectedUser] = useState<User>({ userName: "", status: "" })
    useEffect(() => {
        dispatch(getAllUser()).unwrap()
    }, [])

    const clickOpen = () => {
        dispatch(setOpen())
    }

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
                <div className='flex flex-col md:flex-row gap-2'>
                    <Button danger className='border text-[14px] rounded-md bg-red-500 hover:bg-red-600 transition px-2 py-1 text-white' onClick={() => handleDeleteUser(record.userName)}>Delete</Button>
                    <Button onClick={() => {
                        setSelectedUser(record)
                        clickOpen()
                    }}>
                        Update
                    </Button>
                    <Modal footer={null} open={open} onCancel={clickOpen}>
                        <UpdateUserPage user={selectedUser} />
                    </Modal>
                </div >
            ),
        },
    ]
    const handleDeleteUser = async (userName: string) => {
        await dispatch(deleteUSer({ userName })).unwrap()
        window.location.reload()
    }

    return (
        <div className='w-full p-5 flex flex-col '>
            <Table
                columns={columns}
                dataSource={users!}
                pagination={false}
                rowKey={(record) => record.userName || record.status || Math.random().toString()}
                size="small"
            />
        </div>
    )
}

export default AllUsersPage
