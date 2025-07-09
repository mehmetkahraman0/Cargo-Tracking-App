import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect, useState } from "react"
import { createCargo } from "../redux/slices/cargoSlice"
import type { Product, SelectedProductList } from "../models/Product"
import { MdOutlineKeyboardDoubleArrowDown, MdDeleteOutline } from 'react-icons/md';
import { getProduct } from "../redux/slices/productSlice"

const CreateCargoPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const createdCargo = useSelector((state: RootState) => state.cargo.addedCargo)
  console.log(createdCargo)
  const products = useSelector((state: RootState) => state.product.products)
  const [cargoName, setCargoName] = useState("")
  const [status, setStatus] = useState("No Company")
  let created_at: string
  const [recipientList, setRecipientList] = useState<string[]>([])
  const [recipient, setRecipient] = useState("")
  const [everoneRecipient, setEveroneRecipient] = useState(true)
  const [cargoCompany, setCargoCompany] = useState("")
  let cargoTrackingCode: string
  const [searchValue, setSearchValue] = useState("");
  const [selectedProductList, setSelectedProductList] = useState<SelectedProductList[]>([])
  const searchedProduct = products.filter((item) => item.productName?.toLowerCase().includes(searchValue.toLowerCase()))
  const [productPiece, setProductPiece] = useState<string>("1")

  const handleSave = () => {
    if (cargoCompany == "select") {
      alert("Kargo Şirketi Seçiniz")
      return;
    }
    if (recipientList[0]) {
      setEveroneRecipient(false)
    }
    created_at = new Date().toISOString()
    if (status != "Draft" && status != "Getting Ready") {
      cargoTrackingCode = `${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }
    dispatch(createCargo({ cargoName, status, created_at, product: selectedProductList, recipient: recipientList, everoneRecipient, cargoCompany, cargoTrackingCode })).unwrap()
  }

  const selectedProductHandler = (product: Product) => {
    const item: SelectedProductList = {
      product,
      piece: productPiece
    }
    setSelectedProductList((prev) => [...prev, item])
    console.log("çalışıyor")
    setProductPiece("1")
    setSearchValue("")
  }

  const addRecipientHandler = () => {
    setRecipientList((prev) => [...prev, recipient])
    setRecipient("")
  }

  const deleteRecipientHandler = (item: string) => {
    const updatedRecipients = recipientList.filter((reci) => reci != item)
    setRecipientList(updatedRecipients)
  }

  const deleteSelectedProductHandler = (item: SelectedProductList) => {
    const updatedSelectedProduct = selectedProductList.filter((product) => item != product)
    setSelectedProductList(updatedSelectedProduct)
  }

  useEffect(() => {
    dispatch(getProduct()).unwrap()
  }, [])

  return (
    <div className="w-full bg-amber-50 p-4">
      <div className=" flex flex-col gap-4">
        <div className="">
          <p className="font-semibold text-[18px]">Create Cargo</p>
          <hr className="text-blue-500" />
        </div>
        <div className="flex flex-col justify-between">
          <label className="text-[14px] font-medium" htmlFor="">Corgo Name</label>
          <input className="border p-1 rounded-sm text-[14px]" type="text" onChange={(e) => setCargoName(e.target.value)} placeholder="Enter Cargo Name" />
        </div>
        <div className="flex flex-col">
          <label className="text-[14px] font-medium" htmlFor="">Cargo Status</label>
          <select name="status" id="status" onChange={(e) => setStatus(e.target.value)} className="border rounded-sm py-1 text-[14px]">
            <option value="Draft">Draft</option>
            <option value="Getting Ready">Getting Ready</option>
            <option value="Delivered to Cargo">Delivered to Cargo</option>
            <option value="On the Road">On the Road</option>
            <option value="Delivered">Delivered</option>
            <option value="Deleted Cargo">Deleted Cargo</option>
          </select>
        </div>
        <div className="w-full relative">
          <div>
            <p className="flex flex-row items-center justify-between text-[14px] font-medium">Select Product <MdOutlineKeyboardDoubleArrowDown /></p>
            {selectedProductList.map((item, index) => (
              <div className="">
                <hr />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row  items-center gap-8">
                    <p key={index} className=" hover:bg-gray-100 py-2 px-1 rounded-sm text-[14px]">{item.product.serialNo} -- {item.product.productName}</p>
                    <p className="text-[12px]">Piece : {item.piece}</p>
                  </div>
                  <p className="cursor-pointer hover:text-red-500 text-[18px]" onClick={() => deleteSelectedProductHandler(item)}><MdDeleteOutline /></p>
                </div>
              </div>
            ))}
          </div>
          <input className="border p-1 rounded-sm text-[14px] w-full" type="text" placeholder="Search Product Name" onChange={(e) => setSearchValue(e.target.value)} />
          {searchValue
            ? <div className="absolute h-[200px] overflow-scroll z-50 w-full bg-amber-200 size-fit">
              {searchedProduct.map((item, index) => (
                <div key={index} className="flex flex-row justify-between pl-2 pr-5">
                  <p className="p-1" >{item.productName}</p>
                  <div className="flex flex-row gap-7 items-center">
                    <div className="flex flex-row gap-1">
                      <label className="text-[12px]" htmlFor="">Product Piece</label>
                      <input className="border w-[40px] text-[12px] rounded-md px-1" type="number" min="1" defaultValue="1" onChange={(e) => setProductPiece(e.target.value.toString())} />
                    </div>
                    <button className="text-[12px] border rounded-md px-2" onClick={() => selectedProductHandler(item)}>Add</button>
                  </div>
                </div>
              ))}
            </div>
            : <div className="hidden"></div>
          }
        </div>
        <div className="relative w-full">
          <label className="text-[14px] font-medium" htmlFor="">Cargo Recipient</label>
          {recipientList.map((item, index) => (
            <div>
              <hr />
              <div className="flex flex-row justify-between items-center py-2">
                <p className="text-[12px]" key={index}>{index+1}.Name -- {item}</p>
                <p className="cursor-pointer hover:text-red-500 text-[18px]" onClick={() => deleteRecipientHandler(item)}><MdDeleteOutline /></p>
              </div>
            </div>
          ))}
          <input className="w-full border p-1 rounded-sm text-[14px]" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter Cargo Recipient" />
          <button className="absolute right-1 bottom-[4px] text-[14px] border rounded-md px-2 bg-gray-100" onClick={() => addRecipientHandler()}>Add</button>
        </div>
        <div className="flex flex-col">
          <label className="text-[14px] font-medium" htmlFor="">Cargo Company</label>
          <select name="status" id="status" onChange={(e) => setCargoCompany(e.target.value)} className="border rounded-sm py-1 text-[14px]">
            <option value="select">Select</option>
            <option value="Aras">Aras</option>
            <option value="DHL">DHL</option>
            <option value="Yurtİçi">Yurtİçi</option>
            <option value="UPS">UPS</option>
          </select>
        </div>
        <div className="flex flex-row justify-end mt-5">
          <button className="size-fit bg-blue-500 hover:bg-blue-300 px-2 py-1 text-white rounded-sm text-[14px] tracking-[0.5px]" onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCargoPage
