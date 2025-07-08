import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { useState } from "react"
import { addProduct } from "../redux/slices/productSlice"

const AddProductPage = () => {
    const products = useSelector((state: RootState) => state.product.addedProduct)
    console.log(products)
    const dispatch = useDispatch<AppDispatch>()
    const [productName, setProductName] = useState<string>("")
    const [serialNo, setSerialNo] = useState<string>("")
    const [file, setFile] = useState<File | undefined>()
    
    const handleSave = () => {
        if (!file) {
            alert("file nesnesi yok")
            return
        }
        const fileName = file.name
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension != "png" && extension != "jpeg" && extension != "jpg") {
            alert("seçilen dosya png, jpeg, jpg formatında olabilir")
            return
        }
        setFile(file)
        dispatch(addProduct({ productName, serialNo, file })).unwrap()
    }

    return (
        <div className="w-full bg-amber-50 p-4">
            <div className=" flex flex-col gap-4">
                <div className="mb-5">
                    <p className="font-semibold text-[18px]">Add Product</p>
                    <hr className="text-blue-500" />
                </div>
                <input className="border p-1 rounded-sm text-[14px]" type="text" placeholder="Enter Product Name" onChange={(e) => setProductName(e.target.value)} />
                <input className="border p-1 rounded-sm text-[14px]" type="text" placeholder="Serial No" onChange={(e) => setSerialNo(e.target.value)} />
                <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-1 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-300" />
                <div className="flex flex-row justify-end mt-5">
                    <button className="size-fit bg-blue-500 hover:bg-blue-300 px-2 py-1 text-white rounded-sm text-[14px] tracking-[0.5px]" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddProductPage
