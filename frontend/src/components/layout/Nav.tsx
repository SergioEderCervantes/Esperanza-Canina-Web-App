import { FaPaw } from "react-icons/fa";
import Link from "next/link";


export default function Nav() {
    return (
         <nav className="bg-white flex  justify-between items-center px-8 py-4 shadow-md text-black">
          <div className="flex justify-around items-center gap-2 text-[24px] font-bold">            
            <FaPaw className="text-2xl text-black" />
            <Link href="/">Esperanza Canina</Link>
          </div>
          <div className="flex justify-between align-start items-center gap-6 text-2 font-medium">
            <Link href="/">Inicio</Link>
            <Link href="/perritos">Adoptar</Link>
            <Link href="/ayuda">Apoyanos</Link>
          </div>
        </nav>
    )
}