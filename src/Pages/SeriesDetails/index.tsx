import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
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
           
            setSerieDetail(response.data)
        }

        getDetails()
    },[id])
    return(
        <div>
            <main>
                {serieDetail && (
                    <section key={serieDetail?.id}>
                        <article>
                          <img src={`https://image.tmdb.org/t/p/original/${serieDetail?.backdrop_path}`} alt="" />
                        </article>
                         
                         <div>
                            <h1>{serieDetail?.title}</h1>
                            <p>{serieDetail?.overview}</p>
                            <strong>{serieDetail?.vote_average}</strong>
                         </div>
                    </section>
                )}
            </main>
        </div>
    )
}