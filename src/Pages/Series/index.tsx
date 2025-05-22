import { useState, useEffect } from "react";
import { type FilmesProps } from "../Home";
import api from "../../Services/api";
import { Link } from "react-router-dom";


export const Series = () => {
    const [series, setSeries] = useState<FilmesProps[]>([]);
    const [getAllSeries, setGetAllSeries] = useState<number>(1)
    const [seriesAlta, setSeriesAlta] = useState<FilmesProps[]>([])
    const [getSeriesAlta, setGetSeriesAlta] = useState<number>(1)

    const [loading, setLoading] = useState(true)

    //series populares
        const getSeries = async(page: number) => {
            const response = await api.get("/tv/popular", {
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                },
            });
             setSeries((prev) => [...prev,...response.data.results.slice(0, 8)]);
        };

        useEffect(() => {
            getSeries(getAllSeries)
        },[])
      
        const loadMore = () => {
            const next = getAllSeries + 1
            setGetAllSeries(next)
            getSeries(next)
        }


        //series em alta
     
        const getSeriesEmAlta = async(page:number) => {
            const response = await api.get("/trending/tv/day",{
                params: {
                    api_key: "a440320973db39fc00de6bdcb4604c9b",
                    language: "pt-BR",
                    page: page,
                }
            });
            setSeriesAlta((serie) => [...serie,...response.data.results.slice(0,20)])
        }
      
  
            const loadMoreSeries = () => {
            const next = getSeriesAlta + 1
            setGetSeriesAlta(next)
            getSeriesEmAlta(next)
        }

           useEffect(() => {
            getSeriesEmAlta(getSeriesAlta)
        },[])
    

            if(loading){
        return(
        <div className="mt-50 text-center flex flex-col justify-center items-center text-3xl"> 
        <h1>Sessão sera adicionada em breve!</h1>
        <strong className="text-green-500">Aguarde...</strong>
          <div className="mt-30 bg-gray-800">
           <div className="relative w-20 h-20 flex items-center justify-center">
    
             {/* Círculo sólido interno */}
              <div className="w-12 h-12 rounded-full z-10"></div>

             {/* Círculo girando por fora */}
            <div className="absolute w-20 h-20 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
         </div>
        </div>
        </div>
        )
    }


    return(
  
        <div></div>

        
    )
}