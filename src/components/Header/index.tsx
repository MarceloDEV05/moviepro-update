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
        className="flex p-4 gap-9 top-0 w-full h-16 bg-gray-900 lg:justify-around justify-between items-center fixed z-50">
              <h1 className="text-3xl text-white">
                <Link to='/'>
                Movie<strong className="text-green-500">PRO</strong>
                </Link>
                </h1>

                    {mobile? (
                <div ref={menuRef} className="flex w-full gap-2 items-center">

                    <form onSubmit={movieSearch} className="flex w-full gap-2 items-center">
                    <input type="search" placeholder="Pesquise por filmes..."
                    className="bg-white rounded p-1 w-43 outline-none overflow-ellipsis transition-all placeholder:text-gray-700"
                    value={input}
                    onChange={ (e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <FaSearch color="#fff"/>
                    </button>
                    </form>

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

                    <div className="flex gap-2">
                    <input type="search" placeholder="Pesquise por filmes..."
                    className="bg-white rounded p-1 outline-none"
                    value={input}
                    onChange={ (e) => setInput(e.target.value)}
                    />
                    <button onClick={movieSearch}>
                        <FaSearch color="#fff"/>
                    </button>
                    </div>

                    <Link to='/favoritos'>
                        <button className="cursor-pointer bg-green-500 p-1 rounded-md text-white font-bold">Meus Filmes</button>
                    </Link>
                </>
               )}
        </header>
    )
}