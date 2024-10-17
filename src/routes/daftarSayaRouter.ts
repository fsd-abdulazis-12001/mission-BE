import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { errorHandler } from "../error-handler";
import { addToDaftarSaya, editDaftarSaya, getDaftarSaya, removeFromDaftarSaya } from "../controllers/daftarsaya";

 
const daftarSayaRouter: Router = Router();

// Protected route to add a movie or series to "DaftarSaya"
daftarSayaRouter.post('/daftarsaya', [authMiddleware as any], errorHandler(addToDaftarSaya));

// Protected route to remove a movie or series from "DaftarSaya"
daftarSayaRouter.delete('/daftarsaya/:daftarSayaId', [authMiddleware as any], errorHandler(removeFromDaftarSaya));

daftarSayaRouter.patch('/daftarsaya/:daftarSayaId', [authMiddleware as any], errorHandler(editDaftarSaya));

daftarSayaRouter.get('/daftarsaya', [authMiddleware as any], errorHandler(getDaftarSaya));

export default daftarSayaRouter;
