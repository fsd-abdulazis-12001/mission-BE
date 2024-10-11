import { Router } from "express";
import { getSerieNewReleases } from "../controllers/serie-new-releases";
import { errorHandler } from "../error-handler";

const filmsTrendingMoviesRouter:Router = Router();

filmsTrendingMoviesRouter.get("/serieNewReleases", errorHandler(getSerieNewReleases));
 

export default filmsTrendingMoviesRouter