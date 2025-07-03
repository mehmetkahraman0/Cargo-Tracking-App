import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../redux/store"
import { useState } from "react"
import { addProduct } from "../redux/slices/productSlice"

const AddProductPage = () => {
    const products = useSelector((state: RootState) => state.product.products)
    console.log(products)
    const dispatch = useDispatch<AppDispatch>()
    const [productName, setProductName] = useState<string>("")
    const [serialNo, setSerialNo] = useState<string>("")
    const [file, setFile] = useState<File | undefined>()

    const handleSave = () => {
        if (!file) {
            console.log("file nesnesi yok")
            return
        }
        dispatch(addProduct({ productName, serialNo, file })).unwrap()
    }

    return (
        <div >
            <input type="text" placeholder="product name" onChange={(e) => setProductName(e.target.value)} />
            <input type="text" placeholder="serial no" onChange={(e) => setSerialNo(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
            <button onClick={handleSave}>kaydet</button>
        </div>
    )
}

export default AddProductPage
