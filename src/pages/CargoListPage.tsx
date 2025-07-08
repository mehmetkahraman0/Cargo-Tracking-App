import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../redux/store'
import { getCargo } from '../redux/slices/cargoSlice'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

const CargoListPage = () => {
  const url = "http://localhost:5173"
  const dispatch = useDispatch<AppDispatch>()
  const cargos = useSelector((state: RootState) => state.cargo.cargos)
  const getLoading = useSelector((state: RootState) => state.cargo.getLoading)
  const navigate = useNavigate()

  const [openProductIndexes, setOpenProductIndexes] = useState<number[]>([])

  const toggleProductVisibility = (index: number) => {
    setOpenProductIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleNavigate = (trackingCode: string) => {
    navigate(`/cargo/${trackingCode}`)
  }

  useEffect(() => {
    dispatch(getCargo()).unwrap()
  }, [])

  return (
    <div className='w-full flex flex-col gap-5 mt-5'>
      {cargos.map((item, index) => (
        <div key={index} className='w-full flex flex-row justify-between bg-gray-100 rounded shadow p-4'>
          <div>
            <p className='h-[200px] w-[40px] flex flex-col justify-center items-center bg-gray-200'>{index + 1}</p>
          </div>

          <div className='w-full h-full flex flex-col justify-evenly bg-gray-100 ml-5 cursor-pointer' onClick={() => handleNavigate(item.cargoTrackingCode)}>
            <p>Created at : {item.created_at}</p>
            <p>Cargo Name : {item.cargoName}</p>
            <p>Cargo Company : {item.cargoCompany}</p>
            <div className='flex flex-row flex-wrap gap-1'>
              Recipient : {item.recipient
                  ? item.recipient.map((item, index) => (<p className='underline' key={index}> {item}</p>))
                  : <p className='underline'>Everyone</p>
              }
            </div>
            <p>Cargo Tracking Code : {item.cargoTrackingCode}</p>
          </div>
          <div className='relative w-[400px]'>
            <div className='flex flex-row justify-between cursor-pointer' onClick={() => toggleProductVisibility(index)}>
              <p className='font-semibold'>Products</p>
              {openProductIndexes.includes(index) ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}
            </div>
            {openProductIndexes.includes(index) && (
              <div className='mt-2 bg-gray-100 border rounded p-2 shadow absolute z-10 w-[250px] h-[180px] overflow-scroll'>
                {item.product?.map((prod, i) => (
                  <div key={i} className='flex flex-row justify-between border-b py-1'>
                    <p>{prod.product.productName}</p>
                    <p>{prod.piece}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div onClick={() => handleNavigate(item.cargoTrackingCode)} className='cursor-pointer'>
            <QRCodeSVG className='h-[150px]' value={`${url}/${item.cargoTrackingCode}`} size={200} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CargoListPage
