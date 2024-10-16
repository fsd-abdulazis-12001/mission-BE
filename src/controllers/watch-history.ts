import { prismaClient } from './../index';
import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions/not-found';
import { BadRequestException } from '../exceptions/bad-request';
import { RequestCustom } from '../interfaces/request-custom';
import { ErrorCode } from '../exceptions/root';

interface Genre {
    id: number;
    name: string;
  }
  
  interface MovieGenre {
    genre: Genre;
  }
  
  interface SeriesGenre {
    genre: Genre;
  }
  interface Category {
    id: number;
    name: string;
  }
  
  interface Movie {
    id: number;
    title: string;
    image: string;
    neweps: boolean;
    top10: boolean;
    style: string;
    rating: string;
    duration: number;
    label: string;
    category: Category | null;
    movieGenre: MovieGenre[];
  }
  
  interface Series {
    id: number;
    title: string;
    image: string;
    neweps: boolean;
    top10: boolean;
    style: string;
    rating: string;
    duration: number;
    label: string;
    totaleps: number;
    category: Category | null;
    seriesGenre: SeriesGenre[];
  }
  
  interface WatchHistoryData {
    id: number;
    userId: number;
    movieId: number | null;
    seriesId: number | null;
    currentEpisode: number | null;
    progress: number;
    isFinished: boolean;
    movie?: Movie | null;
    serie?: Series | null;
  }

export const addToWatchHistory = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { movieId, seriesId, currentEpisode, progress, isFinished } = req.body;
    console.log(req.body);

    if (!movieId && !seriesId) {
        throw new BadRequestException("You must provide either movieId or seriesId", ErrorCode.MISSING_REQUIRED_FIELDS);
    }

    let movie = null;
    let series = null;


    if (movieId) {
        movie = await prismaClient.movies.findUnique({
            where: { id: movieId }
        });
        if (!movie) {
            throw new NotFoundException("Movie not found", ErrorCode.MOVIE_NOT_FOUND);
        }
    }

   
    if (seriesId) {
        
        series = await prismaClient.series.findUnique({
            where: { id: seriesId }
        });
        if (!series) {
            throw new NotFoundException("Series not found", ErrorCode.SERIES_NOT_FOUND);
        }
       
    }


    const existingHistory = await prismaClient.watchHistory.findFirst({
        where: {
            userId: req.user?.id,
            OR: [
                { movieId: movieId || undefined },
                { seriesId: seriesId || undefined }
            ]
        }
    });
   
    if (existingHistory) {
        throw new BadRequestException("This item is already in the watch history", ErrorCode.ITEM_ALREADY_IN_WATCH_HISTORY);
    }

    
    const watchHistory = await prismaClient.watchHistory.create({
        data: {
            userId: req.user?.id,
            movieId: movieId || null,
            seriesId: seriesId || null,
            currentEpisode: currentEpisode || null,
            progress: progress || 0,
            isFinished: isFinished || false
        }
    });
     
    res.status(201).json(watchHistory);
};


export const getWatchHistory = async (req: RequestCustom, res: Response, next: NextFunction) => {
    
    if (!req.user || !req.user.id) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }


       
        const watchHistory = await prismaClient.watchHistory.findMany({
            where: {
                userId: req.user.id,  
            },
            include: {
                movie: {
                    include: {
                        movieGenre: {
                            include: {
                                genre: true,  
                            },
                        },
                        category: true,   
                    },
                },
                serie: {
                    include: {
                        seriesGenre: {
                            include: {
                                genre: true,  
                            },
                        },
                        category: true,   
                    },
                },
            },
        });

        
       const result = watchHistory.map((data : WatchHistoryData) => {
        if (data.movie) {
            const movie = data.movie;
            const genres = movie.movieGenre.map((mg : MovieGenre) => mg.genre.name);  

            return {
                watchHistoryId: data.id,  
                type: "movie",   
                movieId: movie.id,  
                ...movie,              
                style: "box",  
                genres: genres,         
                category: movie.category ? movie.category.name : null,   
                progress: data.progress,
                isFinished: data.isFinished
            };
        } else if (data.serie) {
            const serie = data.serie;
            const genres = serie.seriesGenre.map((sg : SeriesGenre) => sg.genre.name);  

            return {
                watchHistoryId: data.id,  
                type: "series",   
                serieId: serie.id,  
                ...serie,               
                style: "box",  
                genres: genres,        
                eps: "Episode " + serie.totaleps,   
                category: serie.category ? serie.category.name : null,   
                progress: data.progress,
                isFinished: data.isFinished,
                currentEpisode: data.currentEpisode || 1
            };
        }
        return null;
    });

        
    res.json(result.filter((item: Record<string, any> | null) => item !== null));

};