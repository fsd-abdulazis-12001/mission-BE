import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
interface Release {
  movie: {
    id: number;
    style: string;
    rating: string;
    duration: number;
    category: {
      id: number;
      name: string;
    } | null;
    movieGenre: {
      genre: {
        id: number;
        name: string;
      };
      movieId: number;
      genreId: number;
    }[];
  };
}


interface MovieGenre {
  genre: {
    id: number;
    name: string;
  };
  movieId: number;
  genreId: number;
}
export const getmovieNewReleases = async (req: Request, res: Response, next: NextFunction) => {
    const movieNewReleases = await prismaClient.movieNewReleases.findMany({
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

     
    const movies = movieNewReleases.map((release : Release) => {
      const movie = release.movie;
      const genres = movie.movieGenre.map((mg : MovieGenre) => mg.genre.name);  

      return {
        ...movie,              
        genres: genres,       
        category: movie.category ? movie.category.name : null,  
      };
    });

    res.json(movies);   
 
};

 