import { prismaClient } from '../index';
import { NextFunction, Request, Response } from 'express';
 
 
export const getSerieTrendings = async (req: Request, res: Response, next: NextFunction) => {

  const serieTrendings = await prismaClient.serieTrendings.findMany({
    include: {
      serie: {
        include: {
          seriesGenre: {
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
  const series = serieTrendings.map((data) => {
    const serie = data.serie;
    const genres = serie.seriesGenre.map((mg) => mg.genre.name); // Extract genre names from MovieGenre

    return {
      ...serie,              // Spread the existing movie fields
      genres: genres, 
      eps: "Episode " + serie.totaleps,       // Add genres array
      category: serie.category ? serie.category.name : null,  // Add category name if it exists
    };
  });

  res.json(series);  // Return the transformed movie data with genres and category
  
  
 }

 