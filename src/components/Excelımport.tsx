import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../redux/store'
import { addProduct } from '../redux/slices/productSlice' // asyncThunk fonksiyonun
import { useAlert } from '../functions/useAlert'

// Excel'den okunan her satırın tipi
interface ExcelProduct {
    productName: string
    serialNo: string
    file?: string
}

// Blob'u base64'e dönüştüren yardımcı fonksiyon
const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

const ExcelImport: React.FC = () => {
    const {successAlert} = useAlert()
    const dispatch = useDispatch<AppDispatch>()
    const [file, setFile] = useState<File>()

    const handleFileUpload = async () => {
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
            const rawData = XLSX.utils.sheet_to_json<ExcelProduct>(worksheet, { defval: '' })

            for (const item of rawData) {
                let fotoBase64 = ''

                if (item.file) {
                    try {
                        const response = await fetch(item.file)
                        const blob = await response.blob()
                        fotoBase64 = await convertBlobToBase64(blob)
                    } catch (error) {
                        console.error('Görsel dönüştürme hatası:', item.file, error)
                        continue // hatalı görselleri atla
                    }
                }

                await dispatch(addProduct({
                    productName: item.productName,
                    serialNo: item.serialNo,
                    file: fotoBase64
                }))
            }

            successAlert("Import işlemi başarılı")
        }

        reader.readAsArrayBuffer(file)
    }

    return (
        <div className="flex flex-row justify-between items-center">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-1 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-300"
            />
            <button
                className='w-[150px] bg-blue-500 rounded-md text-white text-[14px] py-1 px-2'
                onClick={handleFileUpload}
            >
                Import Excel File
            </button>
        </div>
    )
}

export default ExcelImport