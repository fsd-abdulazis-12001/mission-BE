import { Router } from "express";
import { getSerieTopRatins} from "../controllers/serie-top-ratings";
import { errorHandler } from "../error-handler";

const serieTopRatingsRouter:Router = Router();

serieTopRatingsRouter.get("/serieTopRatins", errorHandler(getSerieTopRatins));


export default serieTopRatingsRouter