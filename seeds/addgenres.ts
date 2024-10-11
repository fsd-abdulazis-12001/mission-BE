// // prisma/seed.ts
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const JSONData = [
//     "Aksi",
//     "Anak-anak",
//     "Anime",
//     "Britania",
//     "Drama",
//     "Fantasi Ilmiah & Fantasi",
//     "Kejahatan",
//     "KDrama",
//     "Komedi",
//     "Petualangan",
//     "Perang",
//     "Romantis",
//     "Sains & Alam",
//     "Thriller",
//   ];

//   for (const name of JSONData) {
//     await prisma.genres.upsert({
//       where: { name },
//       update: {},
//       create: { name },
//     });
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });