import { Router } from "express";
import { getmovieNewReleases } from "../controllers/movie-new-releases";
import { errorHandler } from "../error-handler";

const filmsTrendingMoviesRouter:Router = Router();

filmsTrendingMoviesRouter.get("/movieNewReleases", errorHandler(getmovieNewReleases));
 

export default filmsTrendingMoviesRouter