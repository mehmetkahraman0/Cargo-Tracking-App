import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../redux/store'
import { deleteCargo, getCargo, setOpen } from '../redux/slices/cargoSlice'
import { Image, Table, type TableColumnsType } from 'antd'
import type { SelectedProductList } from '../models/Product'
import { QRCodeSVG } from 'qrcode.react'
import { Modal, Button } from 'antd'
import CargoUpdateComponent from '../components/CargoUpdateComponent'

const CargoPage = () => {
    const componentRef = useRef<HTMLDivElement>(null)
    const url = "http://localhost:5173"
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const cargos = useSelector((state: RootState) => state.cargo.cargos)
    const open = useSelector((state: RootState) => state.cargo.open)
    const cargo = cargos.filter((item) => item.id == id)
    const navigate = useNavigate()

    const deleteCargoHandler = (id: string) => {
        dispatch(deleteCargo({ id })).unwrap()
        alert(cargo[0].cargoName + "is deleted.")
        navigate("/cargo-list")
    }
    useEffect(() => {
        dispatch(getCargo()).unwrap()
    }, [dispatch, cargo])

    const columns: TableColumnsType<SelectedProductList> = [
        {
            title: 'Image',
            dataIndex: ['product', 'file'],
            key: 'file',
            render: (file: string) => (
                <Image
                    height={80}
                    src={file}
                    alt="Ürün Fotoğrafı"
                    style={{ objectFit: 'cover' }}
                />
            )
        },
        {
            title: 'Name',
            dataIndex: ['product', 'productName'],
            key: 'productName',
        },
        {
            title: 'Serial No',
            dataIndex: ['product', 'serialNo'],
            key: 'serialNo',
        },
        {
            title: 'Piece',
            dataIndex: 'piece',
            key: 'piece',
        },
    ]
    const clickOpen = () => {
        dispatch(setOpen())
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(setOpen())
    };

    return (
        <div ref={componentRef} className='w-full mx-5'>
            <div className='w-full flex flex-col gap-5 mt-5'>
                <div className='w-full flex flex-col bg-gray-100 rounded shadow p-4 gap-3'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full flex flex-col md:flex-row justify-between'>
                            <div className='flex flex-col gap-2 cursor-pointer'>
                                <div className='flex flex-row items-center gap-2 font-bold'>Created at : <p className='text-[14px] font-medium'>{cargo[0]?.created_at?.slice(0, 10)}</p></div>
                                <div className='flex flex-row items-center gap-2 font-bold'>Cargo Name : <p className='text-[14px] font-medium'> {cargo[0]?.cargoName}</p></div>
                                <div className='flex flex-row items-center gap-2 font-bold'>Cargo Company :<p className='text-[14px] font-medium'>{cargo[0]?.cargoCompany}</p></div>
                                <div className='flex flex-row items-center gap-2 font-bold'>Cargo Status :<p className='text-[14px] font-medium'>{cargo[0]?.status}</p></div>
                                <div className='flex flex-row flex-wrap gap-1 font-medium text-[14px]'>
                                    <p className='font-bold text-[16px]'>Recipient :</p>
                                    {cargo[0]?.recipient ? cargo[0]?.recipient.map((rec, i) => <p className='underline' key={i}> {rec}</p>) : <p className='underline'>Everyone</p>}
                                </div>
                                <div className='flex flex-row items-center gap-2 font-bold'>Cargo Tracking Code : <p className='font-medium text-[14px]'>{cargo[0]?.cargoTrackingCode}</p></div>
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <QRCodeSVG className='h-[150px]' value={`${url}/${cargo[0]?.id}`} size={150} />
                        </div>
                    </div>
                    <div className='flex items-center gap-2 pr-2 cursor-pointer size-fit'>
                        <p className='font-bold'> Products :</p>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={cargo[0]?.product}
                        pagination={false}
                        rowKey={(record) => record.product.id || record.product.serialNo || Math.random().toString()}
                        size="small"
                    />
                    <Button color='cyan' onClick={() => clickOpen()}>Update</Button>
                    <Button danger  onClick={() => deleteCargoHandler(cargo[0].id!)}>Delete</Button>
                    <Modal footer={null} open={open} onCancel={handleCancel}>
                        <CargoUpdateComponent cargo={cargo[0]} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default CargoPage
