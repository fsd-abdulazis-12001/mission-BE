import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getMovieTopRatings = async (req: Request, res: Response, next: NextFunction) => {

  const movieTopRatings = await prismaClient.movieTopRatings.findMany({
    include: {
      movie: {
        include: {
          movieGenre: {
            include: {
              genre: true,  // Fetch the genres linked through the MovieGenre table
            },
          },
          category: true,  // Fetch the category linked to the movie via categoryId
        },
      },
    },
  });

  // Transform the movie data to include genres as an array and category name
  const movies = movieTopRatings.map((data) => {
    const movie = data.movie;
    const genres = movie.movieGenre.map((mg) => mg.genre.name); // Extract genre names from MovieGenre

    return {
      ...movie,              // Spread the existing movie fields
      genres: genres,        // Add genres array
      category: movie.category ? movie.category.name : null,  // Add category name if it exists
    };
  });

  res.json(movies);  // Return the transformed movie data with genres and category
  
 }

 