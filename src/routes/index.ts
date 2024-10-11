import { Router } from "express";
import authRouter from "./auth";
import movieNewReleaseRouter from "./movie-new-releases";
import movieTrendingRouter from "./movie-trendings";
import movieTopRatingsRouter from "./movie-top-ratings";

import SerieNewReleases from "./serie-new-releases";
import serieTopRatingsRouter from "./serie-top-ratings";
import serieTrendingRouter from "./serie-trendings";
import seriePersembahanChillsRouter from "./serie-persembahanchills";

import genresRouter from "./genres";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter)

rootRouter.use(movieNewReleaseRouter)
rootRouter.use(movieTrendingRouter)
rootRouter.use(movieTopRatingsRouter)

rootRouter.use(SerieNewReleases)
rootRouter.use(serieTopRatingsRouter)
rootRouter.use(serieTrendingRouter)
rootRouter.use(seriePersembahanChillsRouter)

rootRouter.use(genresRouter)









export default rootRouter