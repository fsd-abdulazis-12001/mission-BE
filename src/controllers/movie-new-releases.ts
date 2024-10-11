import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getmovieNewReleases = async (req: Request, res: Response, next: NextFunction) => {

    const movieNewReleases = await prismaClient.movieNewReleases.findMany({
        include: {
          movie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const movies = movieNewReleases.map((release) => release.movie);

    res.json(movies);
  
 }

 