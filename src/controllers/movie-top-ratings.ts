import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getMovieTopRatings = async (req: Request, res: Response, next: NextFunction) => {

    const movieTopRatings = await prismaClient.movieTopRatings.findMany({
        include: {
          movie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const movies = movieTopRatings.map((topratings) => topratings.movie);

    res.json(movies);
  
 }

 