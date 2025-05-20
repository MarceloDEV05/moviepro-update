import api from "../../Services/api"
import { useState, useEffect } from "react"
import { type FilmesProps } from "../Home"

export const Filmes = () => {
    const [allFilmes, setAllFilmes] = useState<FilmesProps[]>([])
    const [moreMovies, setMoreMovies] = useState<number>(1)
    

        //page ja vem atribuida com o numero da pagina de filmes = 1
        const getAllFilmes = async(page:number) => {
            const response = await api.get("/movie/popular",{
                  params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                },
            })

            //busca novos filmes e adiciona na lista sem apagar os ja listados
            setAllFilmes((prev) => [...prev, ...response.data.results.slice(0,20)])
        }

        useEffect(() => {
            //renderiza os novos filmes junto aos ja listados
            getAllFilmes(moreMovies)
        },[])
        



    const loadMore = () => {
        //funcao para botao que pega o numero da pagina e adiciona mais um, entao pagina 2
        const next = moreMovies + 1
        setMoreMovies(next)
        getAllFilmes(next)
    }

  

    return(
        <div>
            <h1 className="mt-10 mb-10 text-3xl text-center font-medium">Todos os Filmes</h1>
            <main className="grid grid-cols-4 gap-4 px-6">
              {allFilmes.map((filme) => (
                  <section key={filme.id} className="flex items-center justify-center">
                    <article className="group flex flex-col bg-white rounded-lg overflow-hidden transition-transform w-full max-w-xs h-[500px] hover:scale-105 mb-2">
                        <img 
                        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
                        alt="" 
                        className="w-full h-100  object-cover flex rounded-t-lg transition duration-300 group-hover:brightness-30"
                        />

                        <div className="absolute bottom-35 bg-opacity-60 opacity-0 group-hover:opacity-100 translate-y-8 duration-300 flex flex-col justify-end">
                            <h1 className="text-white text-xl font-medium px-4">{filme.title}</h1>
                            <p className="text-gray-300 line-clamp-4 overflow-hidden mx-5">{filme.overview}</p>
                        </div>
                        <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors hover:bg-gray-950">
                            Acessar
                        </button>
                    </article>
                </section>
              ))}
            </main>
             <button 
            onClick={loadMore}
             className="bg-green-500 font-bold text-white p-2 rounded-lg float-right mr-20 mb-10">Carregar mais...</button> 
        </div>
    )
}