import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getmovieTrendings = async (req: Request, res: Response, next: NextFunction) => {

    const movieTrendings = await prismaClient.movieTrendings.findMany({
        include: {
          movie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const movies = movieTrendings.map((trending) => trending.movie);

    res.json(movies);
  
 }

 