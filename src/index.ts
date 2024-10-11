import  express , { Express , Request , Response} from "express";

import { PrismaClient } from "@prisma/client";




import { PORT  } from "./secret";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/errors";
import { SignupSchema } from "./schema/users";




const app:Express = express();

app.use(express.json())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log: ["query"]
})

app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log("Server started on port 3000");
})