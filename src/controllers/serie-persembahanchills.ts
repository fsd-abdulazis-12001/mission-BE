import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getSeriePersembahanChills = async (req: Request, res: Response, next: NextFunction) => {

    const seriePersembahanChills = await prismaClient.seriePersembahanChill.findMany({
        include: {
          serie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const series = seriePersembahanChills.map((param) => param.serie);

    res.json(series);
  
 }

 