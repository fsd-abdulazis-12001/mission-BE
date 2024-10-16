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

interface SerieNewReleasesData {
  serie: Series;
}
export const getSerieNewReleases = async (req: Request, res: Response, next: NextFunction) => {

  const serieNewReleases = await prismaClient.serieNewReleases.findMany({
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

  
  const series = serieNewReleases.map((data : SerieNewReleasesData) => {
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

 