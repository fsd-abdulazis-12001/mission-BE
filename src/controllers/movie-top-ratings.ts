import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
interface Genre {
  name: string;
}

interface MovieGenre {
  genre: Genre;
}

interface Category {
  name: string;
}

interface Movie {
  id: number;
  title: string;
  image: string;
  neweps: boolean;
  top10: boolean;
  style: string;
  rating: string;
  duration: number;
  label: string;
  category: Category | null;
  movieGenre: MovieGenre[];
}

interface MovieTopRatingData {
  movie: Movie;
}
export const getMovieTopRatings = async (req: Request, res: Response, next: NextFunction) => {

  const movieTopRatings = await prismaClient.movieTopRatings.findMany({
    include: {
      movie: {
        include: {
          movieGenre: {
            include: {
              genre: true,   
            },
          },
          category: true,   
        },
      },
    },
  });

  
  const movies = movieTopRatings.map((data : MovieTopRatingData) => {
    const movie = data.movie;
    const genres = movie.movieGenre.map((mg : MovieGenre) => mg.genre.name);  

    return {
      ...movie,             
      genres: genres,        
      category: movie.category ? movie.category.name : null,  
    };
  });

  res.json(movies);   
  
 }

 