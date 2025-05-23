import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { type FilmesProps } from "../Home"
import api from "../../Services/api"
import { toast } from "react-toastify"


export const Details = () => {
    const[movieDetail, setMovieDetail] = useState<FilmesProps>()
    const { id } = useParams()
    const navigate = useNavigate()

    const saveMovie = () => {
        const myMovies: string|null = localStorage.getItem('@moviepro')

        let savedMovies = myMovies ? JSON.parse(myMovies) : []

        const hasMovie = savedMovies.some((savedMovie: { id: number }) => savedMovie.id === movieDetail?.id)

        if(hasMovie){
            toast.warn('filme ja existe em sua lista')
            return
        }
        savedMovies.push(movieDetail)
        localStorage.setItem('@moviepro', JSON.stringify(savedMovies))
        toast.success('filme salvo com sucesso')
    }

    useEffect(() => {
        const getDetails = async() => {
         await api.get(`/movie/${id}`,{
                params: {
                api_key: "a440320973db39fc00de6bdcb4604c9b",
                language:'pt-BR',
                }
            })
           .then((response) => {
            setMovieDetail(response.data)
           })
           .catch(()=> {
            console.log('filme nao encontrado')
            navigate('/', {replace: true})
            return;
           })
            
        }

        getDetails()
    },[id])


    return(
        <div>
            <main className=" lg:px-50 mt-20 w-full h-screen flex justify-center ">
                {movieDetail && (
                    <section key={movieDetail?.id} 
                    className="px-10"
                    >
                        <article className="">
                            <h1 className="mb-5 font-medium text-2xl text-center mt-5">{movieDetail?.title}</h1>
                          <img src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`} alt="" 
                          className="rounded-lg w-full h-auto"
                          />
                        </article>
                         
                         <div className="px-5 py-5">
                            <h2 className="text-xl font-medium">Sinopse:</h2>
                            {!movieDetail.overview && (
                                <><p>Filme sem sinopse disponivel!</p></>
                            )}
                            
                            <p className=" mb-2">{movieDetail?.overview}</p>
                            <strong className="text-green-700">Avaliações: {movieDetail?.vote_average.toFixed(1)}/10</strong>
                         </div>
                         

                         <div className="flex mx-4 gap-5 mb-20">
                           
                            <button
                            onClick={saveMovie}
                            className="cursor-pointer bg-green-500 text-white p-2 w-30 hover:bg-green-700 transition duration-300 rounded-md">Salvar</button>

                             <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${movieDetail.title} trailer`}>
                            <button  className="cursor-pointer bg-gray-800 text-white p-2 w-30 hover:bg-gray-950 transition duration-300 rounded-md">Trailer</button>
                            </a>
                            
                         </div>
                    </section>
                )}
            </main>
        </div>
    )
}