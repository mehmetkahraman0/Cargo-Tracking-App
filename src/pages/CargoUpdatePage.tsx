import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { AppDispatch, RootState } from '../redux/store'
import { getCargo, updateCargo } from '../redux/slices/cargoSlice'
import { getProduct } from '../redux/slices/productSlice'
import { MdDeleteOutline } from 'react-icons/md'
import type { Product } from '../models/Product'
import type { SelectedProductList } from '../models/Product'
import type { Cargo } from '../models/Cargo'

const CargoUpdatePage = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const cargos = useSelector((state: RootState) => state.cargo.cargos)
    const products = useSelector((state: RootState) => state.product.products)
    console.log("product : "+products)
    const cargo = cargos.find(item => item.id == id)
    const [cargoName, setCargoName] = useState("")
    const [status, setStatus] = useState("")
    const [recipientList, setRecipientList] = useState<string[]>([])
    const [everoneRecipient, setEveroneRecipient] = useState(false)
    const [cargoCompany, setCargoCompany] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [recipient, setRecipient] = useState("")
    const [productPiece, setProductPiece] = useState<string>("1")
    const [selectedProductList, setSelectedProductList] = useState<SelectedProductList[]>([])
    console.log("selected product:"+selectedProductList)
    const searchedProduct = products.filter(item =>
        item.productName?.toLowerCase().includes(searchValue.toLowerCase())
    )

    useEffect(() => {
        dispatch(getCargo()).unwrap()
        dispatch(getProduct()).unwrap()
    }, [dispatch])

    useEffect(() => {
        if (cargo) {
            setCargoName(cargo.cargoName || "")
            setStatus(cargo.status || "")
            setRecipientList(cargo.recipient || [])
            setEveroneRecipient(cargo.everoneRecipient || false)
            setCargoCompany(cargo.cargoCompany || "")
            setSelectedProductList(cargo.product || [])
        }
    }, [cargo])

    const deleteRecipientHandler = (rec: string) => {
        setRecipientList(r => r.filter(item => item !== rec))
    }

    const addRecipientHandler = () => {
        if (recipient && !recipientList.includes(recipient)) {
            setRecipientList(prev => [...prev, recipient])
            setRecipient("")
        }
    }

    const deleteSelectedProductHandler = (item: SelectedProductList) => {
        setSelectedProductList(prev => prev.filter(p => p.product.id !== item.product.id))
    }

    const selectedProductHandler = (product: Product) => {
        if (!selectedProductList.some(p => p.product.id === product.id)) {
            setSelectedProductList(prev => [...prev, { product, piece: productPiece }])
        }
        setSearchValue("")
        setProductPiece("1")
    }

    const handleSave = async () => {
        if (!cargo || !cargo.id) return;

        const updated: Cargo = {
            cargoName: cargoName || cargo.cargoName,
            status: status || cargo.status,
            recipient: recipientList.length > 0 ? recipientList : cargo.recipient,
            everoneRecipient: everoneRecipient ?? cargo.everoneRecipient,
            cargoCompany: cargoCompany || cargo.cargoCompany,
            product: selectedProductList.length > 0 ? selectedProductList : [],
            created_at: cargo.created_at,
            cargoTrackingCode: cargo.cargoTrackingCode,
            id: cargo.id,
        };

        console.log(updated)
        await dispatch(updateCargo({ id: cargo.id, cargo: updated }));
        alert("Kargo güncellendi!");
    };

    if (!cargo) return <div className="p-4">Kargo bulunamadı.</div>

    return (
        <div className="w-full bg-amber-50 p-4">
            <div className="flex flex-col gap-4">
                <p className="font-semibold text-[18px]">Update Cargo</p>
                <hr />
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium">Cargo Name</label>
                    <input className="border p-1 rounded-sm text-[14px]" type="text" value={cargoName} onChange={(e) => setCargoName(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium">Cargo Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-sm py-1 text-[14px]">
                        <option value="Draft">Draft</option>
                        <option value="Getting Ready">Getting Ready</option>
                        <option value="Delivered to Cargo">Delivered to Cargo</option>
                        <option value="On the Road">On the Road</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Deleted Cargo">Deleted Cargo</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium">Products</label>
                    {selectedProductList.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <p className="text-sm">{item.product.productName} ({item.piece} piece)</p>
                            <MdDeleteOutline className="cursor-pointer hover:text-red-500" onClick={() => deleteSelectedProductHandler(item)} />
                        </div>
                    ))}
                    <input className="border p-1 rounded-sm text-[14px]" placeholder="Search product" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    {searchValue &&
                        <div className="bg-yellow-100 p-1 max-h-[150px] overflow-auto">
                            {searchedProduct.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span>{item.productName}</span>
                                    <div className="flex gap-2 items-center">
                                        <input type="number" className="w-[40px] text-sm border px-1" value={productPiece} onChange={(e) => setProductPiece(e.target.value)} />
                                        <button className="text-sm border px-2 rounded" onClick={() => selectedProductHandler(item)}>Add</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium">Recipients</label>
                    {recipientList.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <p className="text-sm">{index + 1}. {item}</p>
                            <MdDeleteOutline className="cursor-pointer hover:text-red-500" onClick={() => deleteRecipientHandler(item)} />
                        </div>
                    ))}
                    <div className="flex gap-2 mt-1">
                        <input className="border p-1 text-[14px] rounded-sm w-full" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter Recipient" />
                        <button className="bg-gray-300 px-2 rounded text-sm" onClick={addRecipientHandler}>Add</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-[14px] font-medium">Cargo Company</label>
                    <select value={cargoCompany} onChange={(e) => setCargoCompany(e.target.value)} className="border rounded-sm py-1 text-[14px]">
                        <option value="select">Select</option>
                        <option value="Aras">Aras</option>
                        <option value="DHL">DHL</option>
                        <option value="Yurtİçi">Yurtİçi</option>
                        <option value="UPS">UPS</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm hover:bg-blue-600" onClick={handleSave}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default CargoUpdatePage
