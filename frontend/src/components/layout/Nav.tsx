import { FaPaw } from "react-icons/fa";


export default function Nav() {
    return (
         <nav className="bg-white flex  justify-between items-center px-8 py-4 shadow-md text-black">
          <div className="flex justify-around items-center gap-2 text-[24px] font-bold">            
            <FaPaw className="text-2xl text-black" />
            <a href="">Esperanza Canina</a>
          </div>
          <div className="flex justify-between align-start items-center gap-6 text-2 font-medium">
            <a href="">Inicio</a>
            <a href="">Adoptar</a>
            <a href="">Apoyanos</a>
          </div>
        </nav>
    )
}