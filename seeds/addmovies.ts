// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   const movies = [
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Suzume",
//       image: "/img/thumbnail/TopRatingFilmsAndSeries/tn1.png",
//       rating: "4.2/5",
//       duration: 254,
//       neweps: true,
//       top10: false,
//       label: "new Episode",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "new",
//       title: "Jurassik World",
//       image: "/img/thumbnail/TopRatingFilmsAndSeries/tn2.png",
//       rating: "4.6/5",
//       duration: 44,
//       neweps: true,
//       top10: false,
//       label: "",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Sonic",
//       image: "/img/thumbnail/TopRatingFilmsAndSeries/tn3.png",
//       rating: "4.3/5",
//       duration: 54,
//       neweps: false,
//       top10: true,
//       label: "Top 10",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "new",
//       title: "All Of Us Dead",
//       image: "/img/thumbnail/TopRatingFilmsAndSeries/tn4.png",
//       rating: "4.5/5",
//       duration: 153,
//       neweps: false,
//       top10: true,
//       label: "Top 10",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Big Hero",
//       image: "/img/thumbnail/TopRatingFilmsAndSeries/tn5.png",
//       rating: "4.3/5",
//       duration: 145,
//       neweps: true,
//       top10: false,
//       label: "new Episode",
//       categoryId: 1
//     }
//   ];

//  
//   const filteredMovies = movies.map(movie => ({
//     style: movie.style,
//     rating: movie.rating,
//     title: movie.title,
//     duration: movie.duration,
//     image: movie.image,
//     neweps: movie.neweps,
//     top10: movie.top10,
//     label: movie.label,
//     categoryId: movie.categoryId 
//   }));

//   // Create the movies and skip duplicates
//   const createdMovies = await prisma.movies.createMany({
//     data: filteredMovies,
//     skipDuplicates: true
//   });

//   console.log('Movies have been added to the database.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
