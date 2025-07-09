import type { Cargo } from "../models/Cargo"
import * as XLSX from 'xlsx';

const ExportCargoExcel = (cargos: Cargo[]) => {
    const flatData = cargos.map((item) => ({
        id: item.id,
        cargoName: item.cargoName,
        status: item.status,
        created_at: item.created_at!.slice(0,10), 
        product: item.product?.map(p =>
            `${p.product.productName} - ${p.product.serialNo} (${p.piece} Piece)`
        ).join(", ") || "",
        recipient: item.recipient?.map(p =>
            `--${p}`
        ).join(", ") || "",
        everoneRecipient: item.recipient ? "Everone" : "Private", 
        cargoCompany: item.cargoCompany || "",
        cargoTrackingCode : item.cargoTrackingCode || "",
    }))

    const workSheet= XLSX.utils.json_to_sheet(flatData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet,"Cargos")

    XLSX.writeFile(workBook, "Cargos.xlsx")
}

export default ExportCargoExcel