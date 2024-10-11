import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getSerieTrendings = async (req: Request, res: Response, next: NextFunction) => {

    const serieTrendings = await prismaClient.serieTrendings.findMany({
        include: {
          serie: true, // mengambil semua field movie
        },
      });
    // extrak data movie
    const series = serieTrendings.map((param) => param.serie);

    res.json(series);
  
 }

 