// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   
//   const series = await prisma.series.findMany();
//   const genres = await prisma.genres.findMany();

//   
//   if (genres.length < 3) {
//     console.error('Not enough genres to assign to movies.');
//     return;
//   }

//   // Iterate through each movie
//   for (const serie of series) {
//     
//     const existingGenres = await prisma.seriesGenre.findMany({
//       where: { genreId: serie.id },
//       select: { genreId: true },
//     });

//     
//     const existingGenreIds = existingGenres.map(genre => genre.genreId);

//    
//     const availableGenres = genres.filter(genre => !existingGenreIds.includes(genre.id));

//     
//     const genresNeeded = 3;
//     if (availableGenres.length < genresNeeded) {
//       console.log(`Not enough available genres for movie ${serie.title}.`);
//       continue; // Skip to the next movie if there aren't enough genres
//     }

//     
//     const randomGenres = getRandomGenres(availableGenres, genresNeeded);

//    
//     const movieGenrePromises = randomGenres.map((genreId) => 
//       prisma.seriesGenre.create({
//         data: {
//           seriesId: serie.id,
//           genreId: genreId,
//         },
//       })
//     );

//     // Await all the promises
//     await Promise.all(movieGenrePromises);
//   }

//   console.log('Unique genres have been added to all movies.');
// }

// function getRandomGenres(genres: Array<{ id: number }>, count: number) {
//   
//   const shuffled = genres.sort(() => 0.5 - Math.random());
//   // Return the first 'count' number of genres
//   return shuffled.slice(0, count).map((genre) => genre.id);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
