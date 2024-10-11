import { Router } from "express";
import { getMovieTopRatings} from "../controllers/movie-top-ratings";
import { errorHandler } from "../error-handler";

const movieTopRatingsRouter:Router = Router();

movieTopRatingsRouter.get("/movieTopRatings", errorHandler(getMovieTopRatings));


export default movieTopRatingsRouter