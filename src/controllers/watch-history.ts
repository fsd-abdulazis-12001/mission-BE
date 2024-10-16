import { prismaClient } from './../index';
import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions/not-found';
import { BadRequestException } from '../exceptions/bad-request';
import { RequestCustom } from '../interfaces/request-custom';
import { ErrorCode } from '../exceptions/root';

// Controller to add to watch history
export const addToWatchHistory = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { movieId, seriesId, currentEpisode, progress, isFinished } = req.body;
    console.log(req.body);
    // Ensure that either movieId or seriesId is provided
    if (!movieId && !seriesId) {
        throw new BadRequestException("You must provide either movieId or seriesId", ErrorCode.MISSING_REQUIRED_FIELDS);
    }

    let movie = null;
    let series = null;

    // Validate the movie if movieId is provided
    if (movieId) {
        movie = await prismaClient.movies.findUnique({
            where: { id: movieId }
        });
        if (!movie) {
            throw new NotFoundException("Movie not found", ErrorCode.MOVIE_NOT_FOUND);
        }
    }

    // Validate the series if seriesId is provided
    if (seriesId) {
        
        series = await prismaClient.series.findUnique({
            where: { id: seriesId }
        });
        if (!series) {
            throw new NotFoundException("Series not found", ErrorCode.SERIES_NOT_FOUND);
        }
       
    }

    // Check for existing watch history to avoid duplicates
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

    // Add to watch history
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
    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }


        // Fetch watch history with related movies and series including genres and category
        const watchHistory = await prismaClient.watchHistory.findMany({
            where: {
                userId: req.user.id, // Get the watch history for the logged-in user
            },
            include: {
                movie: {
                    include: {
                        movieGenre: {
                            include: {
                                genre: true,  // Fetch the genres linked through the MovieGenre table
                            },
                        },
                        category: true,  // Fetch the category linked to the movie via categoryId
                    },
                },
                serie: {
                    include: {
                        seriesGenre: {
                            include: {
                                genre: true,  // Fetch the genres linked through the SeriesGenre table
                            },
                        },
                        category: true,  // Fetch the category linked to the series via categoryId
                    },
                },
            },
        });

       // Transform the watch history data for movies and series
       const result = watchHistory.map((data) => {
        if (data.movie) {
            const movie = data.movie;
            const genres = movie.movieGenre.map((mg) => mg.genre.name); // Extract genre names from MovieGenre

            return {
                watchHistoryId: data.id,  // Keep the watch history id
                type: "movie",  // Indicate that this is a movie
                movieId: movie.id,  // Use a separate movieId to avoid conflict
                ...movie,              // Spread the existing movie fields (excluding 'id')
                style: "box",  
                genres: genres,        // Add genres array
                category: movie.category ? movie.category.name : null,  // Add category name if it exists
                progress: data.progress,
                isFinished: data.isFinished
            };
        } else if (data.serie) {
            const serie = data.serie;
            const genres = serie.seriesGenre.map((sg) => sg.genre.name); // Extract genre names from SeriesGenre

            return {
                watchHistoryId: data.id,  // Keep the watch history id
                type: "series",  // Indicate that this is a series
                serieId: serie.id,  // Use a separate serieId to avoid conflict
                ...serie,              // Spread the existing series fields (excluding 'id')
                style: "box",  
                genres: genres,        // Add genres array
                eps: "Episode " + serie.totaleps,  // Add episode info (optional)
                category: serie.category ? serie.category.name : null,  // Add category name if it exists
                progress: data.progress,
                isFinished: data.isFinished,
                currentEpisode: data.currentEpisode || 1
            };
        }
        return null;
    });

        // Filter out null values and send the transformed data
        res.json(result.filter(item => item !== null));

};