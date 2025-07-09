import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../redux/store'
import { addProduct } from '../redux/slices/productSlice' // asyncThunk fonksiyonun

const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

const ExcelImport: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [file, setFile] = useState<File>()
    const handleFileUpload = async () => {
        console.log(file)
            if (!file) {
                alert("Select File !!")
                return
            }
        const reader = new FileReader()
        reader.onload = async (evt) => {
            const data = evt.target?.result
            if (!data) return
            const workbook = XLSX.read(data, { type: 'array' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
            console.log(rawData)
            for (const item of rawData) {
                let fotoBase64 = ''
                if (item.fotoUrl) {
                    console.log(item)
                    try {
                        const response = await fetch(item.fotoUrl)
                        console.log(response)
                        const blob = await response.blob()
                        console.log(blob)
                        fotoBase64 = await convertBlobToBase64(blob)
                        console.log(fotoBase64)
                    } catch (error) {
                        console.error('Görsel dönüştürme hatası:', item.fotoUrl, error)
                        continue // hatalı görselleri atla
                    }
                }
                console.log(fotoBase64)
                await dispatch(addProduct({ productName: item.productName, serialNo: item.serialNo, file: fotoBase64 }))
            }
        }
        reader.readAsArrayBuffer(file)
        alert("import işlemi başarılı");
        window.location.reload()
    }

    return (
        <div className="flex flex-row justify-between items-center">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-1 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-300" />
            <button className='w-[150px] bg-blue-500 rounded-md text-white text-[14px] py-1 px-2' onClick={() => handleFileUpload()}>Import Excel File</button>
        </div>
    )
}

export default ExcelImport


