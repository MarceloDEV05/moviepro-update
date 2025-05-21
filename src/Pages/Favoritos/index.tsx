import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { type FilmesProps } from "../Home"

export const Favoritos = () => {
    const [savedMovies, setSavedMovies] = useState<FilmesProps[]>([])

    useEffect(() => {
        const myMovies = localStorage.getItem('@moviepro')
        setSavedMovies(myMovies ? JSON.parse(myMovies) : [])
    },[])

    return(
        <div>
            <h1 className="text-2xl text-center font-medium mt-10">Meus Filmes</h1>
            {savedMovies.length === 0 && (
                <>
                <h1 className="text-center text-5xl font-medium mt-10">Ops...</h1>
                <h2 className="text-center text-3xl font-medium mt-5">Você ainda não tem filmes salvos...</h2>
                </>
            )}

            <ul className="mt-10">
                {savedMovies.map((movieList) => (
                    <li key={movieList?.id} className="flex justify-center w-full">
                       <section className="flex-col lg:flex px-8 py-8 w-full justify-center lg:justify-around items-center">
                        <article className="">
                            <img src={`https://image.tmdb.org/t/p/original/${movieList.backdrop_path}`} alt="" className="w-full lg:w-80 rounded"/>
                        </article>

                        <div>
                            <h1 className="font-medium text-2xl">{movieList.title}</h1>
                            <p className="text-gray-700 line-clamp-3 overflow-hidden w-[400px] lg:w-[600px]  italic">{movieList.overview}</p>
                        </div>

                        <button className="bg-gray-800 text-white p-2 rounded w-20">excluir</button>
                       </section>
                    </li>
                ))}
            </ul>
        </div>
    )
}