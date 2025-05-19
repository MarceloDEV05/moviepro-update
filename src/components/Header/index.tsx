import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaBars } from "react-icons/fa"

export const Header = () => {
    const [mobile, setMobile] = useState(false)
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        const screenMobile = window.matchMedia('(max-width: 640px)');
        setMobile(screenMobile.matches);

        const handler = (e : {matches:boolean}) => setMobile(e.matches)
        screenMobile.addEventListener('change', handler)

        return () => screenMobile.removeEventListener('change', handler)
    },[])

    const openMenu = () => setMenu(open => !open)
    

    return(
        <header 
        className="w-full h-16 justify-around items-center flex bg-gray-700">
            <h1 className="text-3xl text-white">Movie<strong className="text-green-500">PRO</strong></h1>
               {mobile? (
                <>
                  <button onClick={openMenu} className=" cursor-pointer text-white ">
                    <FaBars/>
                  </button>

                 {menu && (
                     <div className="absolute right-5 top-12 bg-white  p-2">
                    <ul className="cursor-pointer pb-2 ">
                             <li>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/filmes'>
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link to='/series'>Series</Link>
                        </li>
                        <li>
                            <Link to='/faviritos'>
                                Meus Filmes
                            </Link>
                        </li>
    
                    </ul>
                  </div>
                 )}
                  </>
               ):(
                <>
                 <ul className="lg:flex gap-10 text-white sm:max-w-[600px] hidden">
                        <li>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/filmes'>
                                Filmes
                            </Link>
                        </li>
                        <li>
                            <Link to='/series'>Series</Link>
                        </li>
                    </ul>
                    <Link to='/favoritos'>
                        <button className="cursor-pointer bg-green-500 p-1 rounded-md text-white font-bold">Meus Filmes</button>
                    </Link>
                </>
               )}
          
        </header>
    )
}