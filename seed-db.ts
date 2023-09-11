const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// const Continents = [
//     { name: 'Africa' },
//     { name: 'North America' },
//     { name: 'Asia' },
//     { name: 'Europe' },
//     { name: 'Antarctica' },
//     { name: 'South America' },
//     { name: 'Australia' }
// ];

// (async ()=>{
//     for (const continent of Continents) {
//         await prisma.continent.create({
//             data: continent
//         })
//     }
// })()

// const Countries = [
//     { name: 'Serbia', continent: { connect: { id: '315f334b-fc14-4111-8bbc-babdd4751f7c' } } },
// ];

// (async ()=>{
//     for (const country of Countries) {
//         await prisma.country.create({
//             data: country
//         })
//     }
// })()
