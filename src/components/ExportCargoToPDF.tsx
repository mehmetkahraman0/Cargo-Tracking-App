import type { Cargo } from '../models/Cargo';
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

const ExportCargoToPDF = (cargos: Cargo[]) => {
    const doc = new jsPDF({ orientation: 'landscape' })

    const header = [
        "Sira",
        "Cargo Name",
        "Status",
        "Created At",
        "Products (Piece)",
        "Recipient",
        "Everone Recipient",
        "Cargo Company",
        "Cargo Tracking Code",
    ]

    const rows = cargos.map((item, index) => [
        index + 1,
        item.cargoName || "",
        item.status || "",
        item.created_at!.slice(0, 10),
        item.product?.map(p =>
            `${p.product.productName} - ${p.product.serialNo} (${p.piece})`
        ).join("\n") || "",
        item.recipient?.map(p =>
            `${p}`
        ).join("\n") || "",
        item.recipient ? "Everone" : "Private",
        item.cargoCompany || "",
        item.cargoTrackingCode || "",
    ])

    autoTable(doc, {
        head: [header], body: rows, styles: { fontSize: 8, cellWidth: "wrap" }, columnStyles: { 0:{cellWidth:10},3: { cellWidth: 18 }, 4: { cellWidth: 40 },5:{cellWidth:30},8:{cellWidth:42} }, headStyles: { fillColor: [22, 160, 133] }
    })
    doc.save("Cargos.pdf")
}

export default ExportCargoToPDF