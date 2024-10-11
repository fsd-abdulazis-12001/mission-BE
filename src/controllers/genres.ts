import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getGenres = async (req: Request, res: Response, next: NextFunction) => {

    const genres = await prismaClient.genres.findMany({
      });
    
  
    res.json(genres);
  
 }

 