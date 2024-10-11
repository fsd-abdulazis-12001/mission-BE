// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const serieNewReleasesData = [
//   { serieId: 26 },
//   { serieId: 27 },
//   { serieId: 28 },
//   { serieId: 29 },
//   { serieId: 30 }
// ];

// async function main() {
//   console.log('Start seeding...');

//   await prisma.serieTrendings.createMany({
//     data: serieNewReleasesData,
//     skipDuplicates: true
//   });

//   console.log('Seeding finished.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const episodes = [
    {
      episode: '1',
      image: '/img/thumbnail/Episodes/tn1.png',
      filmname: 'Pilot',
      duration: '30 min',
      filmdescription: 'American football coach Ted Lasso is hired by a wealthy divorcee to coach the English soccer team AFC Richmond',
      neweps: true,
      top10: false
    },
    {
      episode: '2',
      image: '/img/thumbnail/Episodes/tn2.png',
      filmname: 'Biscuits',
      duration: '29 min',
      filmdescription: 'It’s Ted’s first day of coaching, and fans aren’t happy. He makes little headway but remains undeterred as the team play their first match.',
      neweps: true,
      top10: false
    },
    {
      episode: '3',
      image: '/img/thumbnail/Episodes/tn3.png',
      filmname: 'Trent Crimm: Independent',
      duration: '30 min',
      filmdescription: 'To arrange an in-depth exposé, Rebecca pairs cynical journalist Trent Crimm with Ted for a day. Ted and Roy venture into the community.',
      neweps: true,
      top10: false
    },
    {
      episode: '4',
      image: '/img/thumbnail/Episodes/tn4.png',
      filmname: 'For The Children',
      duration: '33 min',
      filmdescription: 'Rebecca hosts the team’s annual charity benefit, where Ted stages a reconciliation between Roy and Jamie.',
      neweps: true,
      top10: false
    },
    {
      episode: '5',
      image: '/img/thumbnail/Episodes/tn5.png',
      filmname: 'Tan Lines',
      duration: '31 min',
      filmdescription: 'With his wife and son visiting from America, Ted makes drastic changes to the lineup during a critical match.',
      neweps: true,
      top10: false
    }
  ];

  for (const episode of episodes) {
    await prisma.episodes.create({
      data: episode
    });
  }

  console.log('Episodes data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

