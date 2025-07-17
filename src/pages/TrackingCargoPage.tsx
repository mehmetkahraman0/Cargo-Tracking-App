import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { useNavigate } from "react-router-dom"

const TrackingCargoPage = () => {
    const navigate = useNavigate()
    const cargos = useSelector((state: RootState) => state.cargo.cargos)
    const [code, setCode] = useState("")
    const trackingHandler = () => {
        const cargo = cargos.filter((item => item.cargoTrackingCode == code))
        console.log(cargo)
        if (cargo.length != 0) {
            if (cargo[0].id) {
                navigate(`/cargo/${cargo[0].id}`)
            }
        } else {
            alert("Girdiğiniz Kargo Numarasına Göre Eşleşme Bulunmadı.")
        }
    }
    return (
        <div className="w-full">
            <div className="max-w-[900px] bg-amber-50 p-5 mx-auto mt-60 rounded-md shadow-xl">
                <hr />
                <header className="w-full flex flex-col items-center text-[20px] font-semibold tracking-[0.5px] my-5">Cargo Tracking</header>
                <hr />
                <div className="flex flex-row justify-between items-center">
                    <div className="w-full flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold mb-1">Cargo Tracking Code</label>
                        <input onChange={(e) => setCode(e.target.value.trim())} className="w-full border rounded-sm text-[14px] px-1 py-1 " type="text" placeholder="Enter Your Cargo Tracking Code" />
                    </div>
                    <button onClick={() => trackingHandler()} className="text-[14px] text-white rounded-md px-2 py-1 bg-blue-500 hover:bg-blue-600 cursor-pointer self-end ml-2 ">Tracking</button>
                </div>
            </div>
        </div>
    )
}

export default TrackingCargoPage