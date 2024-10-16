import { Router } from "express";
import { getmovieTrendings} from "../controllers/movie-trendings";
import { errorHandler } from "../error-handler";

const movieTrendingsRouter:Router = Router();

movieTrendingsRouter.get("/movieTrendings", errorHandler(getmovieTrendings));
 
export default movieTrendingsRouter