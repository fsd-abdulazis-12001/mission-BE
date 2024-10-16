import { Router } from "express";
import { addToWatchHistory, getWatchHistory } from "../controllers/watch-history";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middleware/auth";

const watchHistoryRouter:Router = Router();

// Protected route to add a movie or series to watch history
watchHistoryRouter.post("/watchhistory", [authMiddleware as any], errorHandler(addToWatchHistory));
watchHistoryRouter.get("/watchhistory", [authMiddleware as any], errorHandler(getWatchHistory));
 
export default watchHistoryRouter;