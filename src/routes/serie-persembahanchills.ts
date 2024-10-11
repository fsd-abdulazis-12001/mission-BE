import { Router } from "express";
import { getSeriePersembahanChills } from "../controllers/serie-persembahanchills";
import { errorHandler } from "../error-handler";

const seriePersembahanChillsRouter:Router = Router();

seriePersembahanChillsRouter.get("/SeriePersembahanChills", errorHandler(getSeriePersembahanChills));
 

export default seriePersembahanChillsRouter