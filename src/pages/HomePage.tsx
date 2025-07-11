import bg from "../assets/home.jpg"

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full h-full flex flex-col items-end pt-5 pr-5">
        <p className="text-[30px] font-bold tracking-[2px] text-shadow-md text-shadow-gray-400 text-[#FBF5DE]">İşletmenizin</p>
        <p className="text-[26px] font-bold tracking-[0.5px] text-shadow-lg text-shadow-gray-400 text-[#FBF5DE]"> Kontrolü</p>
        <p className="text-[20px] font-bold tracking-[0.5px] text-shadow-lg text-shadow-gray-400 text-[#FBF5DE]">Ve</p>
        <p className="text-[26px] font-bold tracking-[0.5px] text-shadow-lg text-shadow-gray-400 text-[#FBF5DE]">Takibi İçin Buradayız</p>
        <p className="text-[26px] font-bold tracking-[0.5px] text-shadow-lg text-shadow-gray-400 text-[#FBF5DE]">Sizin yanınızdayız</p>
      </div>
    </div>
  )
}

export default HomePage