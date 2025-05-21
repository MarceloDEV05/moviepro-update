import { Link, type FormEncType } from "react-router-dom"
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
        if(input){
            searchMovie(input)
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
        className="w-full h-16 px-4 justify-between  items-center flex bg-gray-700 lg:justify-around fixed top-0 left-0 z-50">
            <h1 className="text-3xl text-white">
                <Link to='/'>
                Movie<strong className="text-green-500">PRO</strong>
                </Link>
                </h1>
               {mobile? (
                <div ref={menuRef} className="flex gap-2 items-center">

                      <div className="flex gap-2 items-center px-4">
                    <input type="search" placeholder="Pesquise por filmes..."
                    className="bg-white rounded p-1 outline-none w-full max-w-md px-4 overflow-ellipsis transition-all lg:w-90"
                    value={input}
                    onChange={ (e) => setInput(e.target.value)}
                    />
                    <button onClick={movieSearch}>
                        <FaSearch color="#fff"/>
                    </button>
                    </div>

                  <button onClick={openMenu}  className=" cursor-pointer text-white ">
                    <FaBars/>
                  </button>

                     

                 {menu && (
                     <div className="absolute w-30 right-0 top-16 rounded-b shadow-lg bg-white ease-in-out duration-300 transition  p-2">
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