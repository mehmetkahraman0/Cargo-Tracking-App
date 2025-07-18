import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { useState } from "react"
import { addProduct } from "../redux/slices/productSlice"
import { convertFileToBase64 } from "../functions/convertBase64"
import ExcelImport from "../components/Excelımport"
import Found404Page from "./Found404Page"
import { useAlert } from "../functions/useAlert"

const AddProductPage = () => {
    const {warningAlert , contextHolder } = useAlert()
    const dispatch = useDispatch<AppDispatch>()
    const [productName, setProductName] = useState<string>("")
    const [serialNo, setSerialNo] = useState<string>("")
    const [file, setFile] = useState<File | undefined>()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const handleSave = async () => {
        if (!file) {
            alert("file nesnesi yok")
            return
        }
        if(productName == "" && serialNo == ""){
            warningAlert("Ürün bilgilerini eksiksiz giriniz.")
            return
        }
        const fileName = file.name
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension != "png" && extension != "jpeg" && extension != "jpg") {
            warningAlert("seçilen dosya png, jpeg, jpg formatında olabilir")
            return
        }
        const base64Convert = await convertFileToBase64(file)
        dispatch(addProduct({ productName, serialNo, file: base64Convert })).unwrap()
    }

    return (
          ["Master Admin"].includes(currentUser?.status)
            ? <div className="w-full bg-amber-50 p-4">
                {contextHolder}
                <div className=" flex flex-col gap-4">
                    <div className="mb-5">
                        <p className="font-semibold text-[18px]">Add Product</p>
                        <hr className="text-blue-500" />
                    </div>
                    <hr />
                    <ExcelImport />
                    <hr />
                    <input className="border p-1 rounded-sm text-[14px]" type="text" placeholder="Enter Product Name" onChange={(e) => setProductName(e.target.value)} />
                    <input className="border p-1 rounded-sm text-[14px]" type="text" placeholder="Serial No" onChange={(e) => setSerialNo(e.target.value)} />
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-1 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-300" />
                    <div className="flex flex-row justify-end mt-5">
                        <button className="size-fit bg-blue-500 hover:bg-blue-300 px-2 py-1 text-white rounded-sm text-[14px] tracking-[0.5px]" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
            : <Found404Page />
    )
}

export default AddProductPage
