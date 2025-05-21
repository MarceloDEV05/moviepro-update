import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { type FilmesProps } from "../Home"
import api from "../../Services/api"

export const SeriesDetails = () => {
    const[serieDetail, setSerieDetail] = useState<FilmesProps>()
    const { id } = useParams()

    useEffect(() => {
        const getDetails = async() => {
            const response = await api.get(`/tv/${id}`,{
                params: {
                api_key: "a440320973db39fc00de6bdcb4604c9b",
                }
            })
           console.log(response.data)
            setSerieDetail(response.data)
        }

        getDetails()
    },[id])
    return(
        <div>
            <main className="lg:px-50 flex w-full justify-center h-screen">
                {serieDetail && (
                    <section key={serieDetail?.id} className="px-10">
                        <article>
                          <h1 className="text-2xl text-center font-medium mt-10 mb-10">{serieDetail?.name}</h1>
                          <img src={`https://image.tmdb.org/t/p/original/${serieDetail?.backdrop_path}`} alt="" className="h-80 lg:h-100 w-full rounded-lg object-cover" />
                        </article>
                         
                         <div>
                            <h2 className="font-medium text-xl text-gray-800">Sinopse:</h2>
                            <p>{serieDetail?.overview}</p>
                            <strong className="text-green-600 font-bold">Avaliações: {serieDetail?.vote_average.toFixed(1)}/10</strong>
                         </div>

                         <div className="flex gap-6 mt-5">
                            <button className="p-2 cursor-pointer bg-green-500 hover:bg-green-700 transition duration-300 w-25 rounded-md text-white">Salvar</button>

                             <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${serieDetail.name} trailer`}>
                            <button className="p-2 cursor-pointer bg-gray-800 transition duration-300 hover:bg-gray-950 w-25 rounded-md text-white">Trailer</button>
                            </a>
                         </div>
                    </section>
                )}
            </main>
        </div>
    )
}