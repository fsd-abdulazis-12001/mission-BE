import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getSerieTopRatins = async (req: Request, res: Response, next: NextFunction) => {

    const serieTopRatings = await prismaClient.serieTopRatings.findMany({
        include: {
          serie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const series = serieTopRatings.map((param) => param.serie);

    res.json(series);
  
 }

 