import { Link } from "react-router-dom"
import { useState, useEffect,useRef, type FormEvent } from "react"
import { FaBars, FaSearch } from "react-icons/fa"

import { useContext } from "react"
import { MovieContext } from "../MovieContext"


export const Header = () => {
    const [mobile, setMobile] = useState(false)
    const [menu, setMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)


    const [input, setInput] = useState('')
    const { searchMovie } = useContext(MovieContext)

    const movieSearch = (e:FormEvent) => {
        e.preventDefault()
        if(input.trim()){
            searchMovie(input.trim())
        }
        setInput('')
    }

    useEffect(() => {
        const screenMobile = window.matchMedia('(max-width: 640px)');
        setMobile(screenMobile.matches);

        const handler = (e: {matches:boolean}) => setMobile(e.matches)
        screenMobile.addEventListener('change', handler)

        return () => screenMobile.removeEventListener('change', handler)
    },[])

    const openMenu = () => setMenu(open => !open)
    
    useEffect(() => {
        //recebe um evento do mouse como tipagem
        const outClick = (e: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setMenu(false)
            }
        }
        document.addEventListener('mousedown', outClick)
        return() => document.removeEventListener('mousedown', outClick)
    },[])



    return(
        <header 
        className="fixed w-full h-16 top-0 z-50 text-black bg-gray-900 flex justify-between      md:justify-around items-center px-4 gap-5">
              <h1 className="text-2xl text-white">
                <Link to='/'>
                Movie<strong className="text-green-500">PRO</strong>
                </Link>
                </h1>

                  <form onSubmit={movieSearch} className="flex gap-2 items-center">
                    <input type="search" placeholder="Pesquise por filmes..."
                    className="bg-white rounded p-1 w-32 outline-none overflow-hidden transition-all placeholder:text-gray-700"
                    value={input}
                    onChange={ (e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <FaSearch color="#fff"/>
                    </button>
                    </form>

                    {mobile? (
                <div ref={menuRef} className="flex w-full gap-2 items-center">

                  <button onClick={openMenu}  className=" cursor-pointer text-white float-right">
                    <FaBars/>
                  </button>

                    {menu && (
                     <div className="absolute right-0 text-black top-16 rounded-b shadow-lg bg-white ease-in-out duration-300 transition  p-2">
                    <ul className="cursor-pointer mt-4 pb-2">
                             <li className="mb-5">
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="mb-5">
                            <Link to='/filmes'>
                                Filmes
                            </Link>
                        </li>
                        <li className="mb-5">
                            <Link to='/series'>Series</Link>
                        </li>
                        <li className="mb-5">
                            <Link to='/favoritos'>
                                Meus Filmes
                            </Link>
                        </li>
    
                    </ul>
                  </div>
                 )}
                  </div>
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
                        <button className="cursor-pointer bg-green-500 p-1 rounded text-white font-bold">Meus Filmes
                        </button>
                    </Link>
                </>
               )}
        </header>
    )
}