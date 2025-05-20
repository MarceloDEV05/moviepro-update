import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { type FilmesProps } from "../Home"
import api from "../../Services/api"


export const Details = () => {
    const[movieDetail, setMovieDetail] = useState<FilmesProps>()
    const { id } = useParams()

    useEffect(() => {
        const getDetails = async() => {
            const response = await api.get(`/movie/${id}`,{
                params: {
                api_key: "a440320973db39fc00de6bdcb4604c9b",
                language:'pt-BR',
                }
            })
           
            setMovieDetail(response.data)
        }

        getDetails()
    },[id])
    return(
        <div>
            <main className="w-full h-screen flex justify-center">
                {movieDetail && (
                    <section key={movieDetail?.id} 
                    className="flex w-full h-full flex-col gap-5 px-5 mt-20 justify-center mb-10 px-40"
                    >
                        <article className="flex flex-col items-center w-full justify-center mt-10">
                            <h1 className="mb-5 font-medium text-2xl">{movieDetail?.title}</h1>
                          <img src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`} alt="" 
                          className="rounded-lg w-full h-140 sm:w-full"
                          />
                        </article>
                         
                         <div className="ml-2 flex w-full flex-col justify-center">
                            <h2 className="font-bold text-gray-700 mb-2">Sinopse:</h2>
                            <p className="justify-center flex md:text-center sm:text-center">{movieDetail?.overview}</p>
                            <strong className="text-green-700">Avaliações: {movieDetail?.vote_average.toFixed(1)}/10</strong>
                         </div>
                         

                         <div className="flex gap-10 mb-20">
                            <button className="bg-green-500 text-white p-2 w-30 hover:bg-green-700 transition duration-300">Salvar</button>
                            <button className="bg-gray-800 text-white p-2 w-30 hover:bg-gray-950 transition duration-300">Trailer</button>
                         </div>
                    </section>
                )}
            </main>
        </div>
    )
}