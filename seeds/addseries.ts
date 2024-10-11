// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   const series = [
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Suzume",
//       image: "/img/thumbnail/TopRatingSeriesHariIni/tn1.png",
//       rating: "4.2/5",
//       duration: 254,
//       totaleps: 13,
//       neweps: false,
//       top10: true,
//       label: "Premium",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "new",
//       title: "Jurassik World",
//       image: "/img/thumbnail/TopRatingSeriesHariIni/tn2.png",
//       rating: "4.6/5",
//       duration: 44,
//       totaleps: 15,
//       neweps: false,
//       top10: true,
//       label: "Premium",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Sonic",
//       image: "/img/thumbnail/TopRatingSeriesHariIni/tn3.png",
//       rating: "4.3/5",
//       duration: 54,
//       totaleps: 14,
//       neweps: false,
//       top10: true,
//       label: "Premium",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "new",
//       title: "All Of Us Dead",
//       image: "/img/thumbnail/TopRatingSeriesHariIni/tn4.png",
//       rating: "4.5/5",
//       duration: 153,
//       totaleps: 13,
//       neweps: false,
//       top10: true,
//       label: "Premium",
//       categoryId: 1
//     },
//     {
//       style: "box-panjang",
//       type: "old",
//       title: "Big Hero",
//       image: "/img/thumbnail/TopRatingSeriesHariIni/tn5.png",
//       rating: "4.3/5",
//       duration: 145,
//       totaleps: 11,
//       neweps: false,
//       top10: true,
//       label: "Premium",
//       categoryId: 1
//     }
//   ];

//   
//   const filteredSeries = series.map(serie => ({
//     style: serie.style,
//     rating: serie.rating,
//     title: serie.title,
//     duration: serie.duration,
//     image: serie.image,
//     neweps: serie.neweps,
//     totaleps: serie.totaleps,
//     top10: serie.top10,
//     label: serie.label,
//     categoryId: serie.categoryId 
//   }));

//   // Create the series and skip duplicates
//   const createdSeries= await prisma.series.createMany({
//     data: filteredSeries,
//     skipDuplicates: true
//   });

//   console.log('Series have been added to the database.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
