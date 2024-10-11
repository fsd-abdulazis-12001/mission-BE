import { Router } from "express";
import { getGenres } from "../controllers/genres";
import { errorHandler } from "../error-handler";

const genresRouter:Router = Router();

genresRouter.get("/genres", errorHandler(getGenres));
 

export default genresRouter