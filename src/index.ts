import  express , { Express , Request , response, Response} from "express";
const cors = require('cors');
import { PrismaClient } from "@prisma/client";




import { PORT  } from "./secret";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/errors";
 



const app:Express = express();

app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow cookies or authorization headers
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