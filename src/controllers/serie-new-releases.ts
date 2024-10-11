import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getSerieNewReleases = async (req: Request, res: Response, next: NextFunction) => {

    const serieNewReleases = await prismaClient.serieNewReleases.findMany({
        include: {
          serie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const series = serieNewReleases.map((param) => param.serie);

    res.json(series);
  
 }

 