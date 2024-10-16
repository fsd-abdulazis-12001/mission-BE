import  express , { Express , Request , response, Response} from "express";
const cors = require('cors');
import { PrismaClient } from "@prisma/client";
import { FE_BASE_URL } from "./secret";



import { PORT  } from "./secret";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/errors";
 



const app:Express = express();

app.use(express.json())
const corsOptions = {
    origin: FE_BASE_URL,  
    methods: 'GET,POST,PUT,DELETE',
    credentials: true  
  };
  
  app.use(cors(corsOptions));

 
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log: ["query"]
})

app.use(errorMiddleware)
app.listen(PORT, () => {
    console.log("Server started on port 3000");
    
})

export default app