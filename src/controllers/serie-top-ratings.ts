import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
interface Genre {
  name: string;
}

interface SeriesGenre {
  genre: Genre;
}

interface Category {
  name: string;
}

interface Series {
  id: number;
  title: string;
  image: string;
  neweps: boolean;
  top10: boolean;
  style: string;
  rating: string;
  duration: number;
  label: string;
  totaleps: number;
  category: Category | null;
  seriesGenre: SeriesGenre[];
}

interface SerieTopRatingsData {
  serie: Series;
}
export const getSerieTopRatins = async (req: Request, res: Response, next: NextFunction) => {

  const serieTopRatings = await prismaClient.serieTopRatings.findMany({
    include: {
      serie: {
        include: {
          seriesGenre: {
            include: {
              genre: true,   
            },
          },
          category: true,   
        },
      },
    },
  });

 
  const series = serieTopRatings.map((data : SerieTopRatingsData) => {
    const serie = data.serie;
    const genres = serie.seriesGenre.map((sg : SeriesGenre) => sg.genre.name);  

    return {
      ...serie,              
      genres: genres,       
      eps: "Episode " + serie.totaleps,  
      category: serie.category ? serie.category.name : null,  
    };
  });

  res.json(series);  
  
  
 }

 