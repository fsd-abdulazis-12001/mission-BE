import { Router } from "express";
import { getSerieTrendings} from "../controllers/serie-trendings";
import { errorHandler } from "../error-handler";

const serieTrendingRouter:Router = Router();

serieTrendingRouter.get("/serieTrendings", errorHandler(getSerieTrendings));
 

export default serieTrendingRouter