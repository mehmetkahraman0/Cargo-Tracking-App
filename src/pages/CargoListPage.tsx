import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../redux/store'
import { getCargo } from '../redux/slices/cargoSlice'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md'
import { Table, Image } from 'antd'
import type { TableColumnsType } from 'antd'
import type { SelectedProductList } from '../models/Product'
import ExportCargoExcel from '../components/ExportCargoToExcel'
import ExportCargoToPDF from '../components/ExportCargoToPDF'
import type { Cargo } from '../models/Cargo'
import { IoMdDownload } from 'react-icons/io'
import VirtualList from "rc-virtual-list"
import { Pagination } from 'antd';
import Found404Page from './Found404Page'

const CargoListPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [filteredCargos, setFilteredCargos] = useState<Cargo[]>([])
  const cargos = useSelector((state: RootState) => state.cargo.cargos)
  const getLoading = useSelector((state: RootState) => state.cargo.getLoading)
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const [pageType, setPageType] = useState("Pagination")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5;
  const currentUser = useSelector((state: RootState) => state.user.currentUser)


  const toggleTable = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filterHandler = () => {
    if (!filterName && !filterDate && (!filterStatus || filterStatus === "select")) {
      setFilteredCargos([])
      return
    }
    const filtered = cargos.filter((item) => {
      const matchesName = filterName ? item.cargoName?.toLowerCase().includes(filterName.toLowerCase()) : true
      const matchesDate = filterDate ? item.created_at?.slice(0, 10).toLowerCase().includes(filterDate.toLowerCase()) : true
      const matchesStatus = filterStatus && filterStatus !== 'select' ? item.cargoCompany === filterStatus : true
      return matchesName && matchesDate && matchesStatus
    })
    setFilteredCargos(filtered)
  }

  const result = filteredCargos.length > 0 ? filteredCargos : cargos;
  const paginationResult = result.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleNavigate = (trackingCode: string) => {
    navigate(`/cargo/${trackingCode}`)
  }

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

  useEffect(() => {
    dispatch(getCargo()).unwrap()
  }, [dispatch, currentPage])
  return (
    getLoading
      ? <div className='w-full'>loading</div>
      :
      currentUser.status == "Official" || currentUser.status == "Admin" || currentUser.status == "Master Admin" ?
        <div className='w-full flex-col mt-5 mx-5'>
          <div >
            <header className='font-semibold text-[18px] tracking-normal mb-1'>Select Page Type</header>
            <div className='flex flex-row gap-5'>
              <button onClick={() => setPageType("Pagination")} className={pageType == "Pagination" ? "bg-gray-400 rounded-sm px-2 py-1 text-[14px]" : "bg-blue-500 text-white rounded-sm px-2 py-1 text-[14px] hover:bg-blue-600 cursor-pointer"}>Pagination</button>
              <button onClick={() => setPageType("Virtual List")} className={pageType == "Virtual List" ? "bg-gray-400 rounded-sm px-2 py-1 text-[14px]" : "bg-blue-500 text-white rounded-sm px-2 py-1 text-[14px] hover:bg-blue-600 cursor-pointer"}>Virtual List</button>
            </div>
            <hr className='my-5' />
          </div>
          <div>
            <header className='font-semibold text-[18px] tracking-normal mb-1'>Filter</header>
            <div className='w-full flex flex-col md:flex-row justify-between gap-3'>
              <div className='w-full flex flex-row justify-between gap-3'>
                <select name="status" id="status" onChange={(e) => setFilterStatus(e.target.value)} className=" border rounded-sm py-1 text-[14px] w-[120px]">
                  <option value="select">No Company</option>
                  <option value="Aras">Aras</option>
                  <option value="DHL">DHL</option>
                  <option value="Yurtİçi">Yurtİçi</option>
                  <option value="UPS">UPS</option>
                </select>
                <input className='w-full border rounded-sm p-1' type="text" onChange={(e) => setFilterName(e.target.value)} placeholder='Enter Filter Name' />
              </div>
              <div className=' w-full flex flex-row justify-between gap-3'>
                <input className='w-[120px]' type="date" onChange={(e) => setFilterDate(e.target.value)} />
                <button className='bg-blue-500 text-[14px] text-white rounded-md px-2 py-1 w-[80px] cursor-pointer hover:bg-blue-600 transition' onClick={() => filterHandler()}>Filter</button>
              </div>
            </div>
            <hr className='mt-5' />
            <div className='flex flex-col gap-2 my-5'>
              <div className='flex flex-row justify-between'>
                <button className="bg-blue-500 rounded-sm px-2 py-1 text-[14px] text-white flex flex-row items-center gap-2 cursor-pointer hover:bg-blue-600 transition" onClick={() => ExportCargoExcel(cargos)}><IoMdDownload />All Excel</button>
                {filteredCargos.length != 0
                  //filter var olduğunda filterpdf/excel indirilebilir olsun-- Product update ekranı ve Cargo update olaylarını bitir. statüye göre kargo numara olayını bak bide qr olayın bak
                  ? <button className="bg-green-600 rounded-sm px-2 py-1 text-[14px] text-white flex flex-row items-center gap-2 cursor-pointer hover:bg-green-700 transition" onClick={() => ExportCargoExcel(filteredCargos)}><IoMdDownload /> Filtered Excel</button>
                  : ""}
              </div>
              <div className='flex flex-row justify-between'>
                <button className="bg-blue-500 rounded-sm px-2 py-1 text-[14px] text-white flex flex-row items-center gap-2 cursor-pointer hover:bg-blue-600 transition" onClick={() => ExportCargoToPDF(cargos)}><IoMdDownload /> All PDF</button>
                {filteredCargos.length != 0
                  ? <button className="bg-green-600 rounded-sm px-2 py-1 text-[14px] text-white flex flex-row items-center gap-2 cursor-pointer hover:bg-green-700 transition" onClick={() => ExportCargoToPDF(filteredCargos)}><IoMdDownload /> Filtered PDF</button>
                  : ""
                }
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-5 '>
            <VirtualList data={pageType == "Virtual List" ? result.reverse() : paginationResult.reverse()} itemKey={(item) => item.id!}>
              {(item, index) => (
                <div key={index} className='w-full flex flex-col bg-gray-100 rounded shadow p-4 gap-3 mb-5'>
                  <div className='w-full flex flex-col md:flex-row justify-between'>
                    <div className='flex flex-col gap-2 cursor-pointer' onClick={() => handleNavigate(item.id!)}>
                      <div className='flex flex-row items-center gap-2 font-bold'>Created at : <p className='text-[14px] font-medium'>{item.created_at?.slice(0, 10)}</p></div>
                      <div className='flex flex-row items-center gap-2 font-bold'>Cargo Name : <p className='text-[14px] font-medium'> {item.cargoName}</p></div>
                      <div className='flex flex-row items-center gap-2 font-bold'>Cargo Company :<p className='text-[14px] font-medium'>{item.cargoCompany}</p></div>
                      <div className='flex flex-row flex-wrap gap-1 font-medium text-[14px]'>
                        <p className='font-bold text-[16px]'>Recipient :</p>
                        {item.recipient ? item.recipient.map((rec, index) => <p className='underline' key={index}> {rec}</p>) : <p className='underline'>Everyone</p>}
                      </div>
                      <div className='flex flex-row items-center gap-2 font-bold'>Cargo Tracking Code: <p className='font-medium text-[14px]'>{item.cargoTrackingCode}</p></div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 pr-2 cursor-pointer hover:underline rounded-md hover:bg-gray-200 size-fit' onClick={() => toggleTable(index)}>
                    <p>Show Products</p>
                    {openIndexes.includes(index) ? <MdOutlineKeyboardDoubleArrowUp /> : <MdOutlineKeyboardDoubleArrowDown />}
                  </div>
                  {openIndexes.includes(index) && (
                    <Table
                      columns={columns}
                      dataSource={item.product}
                      pagination={false}
                      rowKey={(record) => record.product.id || record.product.serialNo || Math.random().toString()}
                      size="small"
                    />
                  )}
                </div>
              )}
            </VirtualList>
          </div>
          <div className={pageType == "Pagination" ? "flex flex-row justify-center my-5" : "hidden"}>
            <Pagination simple current={currentPage} pageSize={pageSize} total={result.length} onChange={(page) => setCurrentPage(page)} />
          </div>
        </div>
        : <Found404Page />
  )
}

export default CargoListPage
