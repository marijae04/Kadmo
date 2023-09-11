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





const Countries = [
    { name: 'Turkey', continent: { connect: { id: '64fed3100b18d5063b0a1127' } } },

    { name: 'Spain', continent: { connect: { id: '64fed3110b18d5063b0a1128'}}},

    { name: 'Italy', continent: { connect: { id: '64fed3110b18d5063b0a1128' } } },

    { name: 'China', continent: { connect: { id: '64fed3100b18d5063b0a1127'}}},

    { name: 'India', continent: { connect: { id: '64fed3100b18d5063b0a1127' } } },

    { name: 'Thailand', continent: { connect: { id: '64fed3100b18d5063b0a1127'}}},

    { name: 'Egypt', continent: { connect: { id: '64fed30f0b18d5063b0a1125' } } },

    { name: 'Morocco', continent: { connect: { id: '64fed30f0b18d5063b0a1125'}}},

    { name: 'Brazil', continent: { connect: { id: '64fed3120b18d5063b0a112a' } } },

    { name: 'Argentina', continent: { connect: { id: '64fed3120b18d5063b0a112a'}}},

    { name: 'Canada', continent: { connect: { id: '64fed3100b18d5063b0a1126'}}},

    { name: 'Australia', continent: { connect: { id: '64fed3120b18d5063b0a112b'}}},

];

(async ()=>{
    for (const country of Countries) {
        await prisma.country.create({
            data: country
        })
    }
})()

const Posts = [{
    "title": "Spanish Paella",
    "content": "Paella is a classic Spanish rice dish made with rice, saffron, vegetables, chicken, and seafood cooked and served in one pan. Although paella originates from Valencia, it’s recognized as the national food of Spain and there are several different varieties. The most common types of paella are chicken paella, seafood paella, or mixed paella (a combination of seafood, meats, and vegetables).",
    "imageURL": "https://images.ctfassets.net/lufu0clouua1/2qUGdB4SXoLbzrqXAvbF2g/95516b632b32057ec1cf2ea4c335fbdc/EASY_SPANISH_PAELLA_06_27_2218291__1_.jpg",
    "country": {
        "connect": {
            "id": "64fed40908000cacb5d1ffd0"
        }
    },
    "category": "Recipe",
    "author": {
        "connect": {
            "id": "64fed24cf52a325a2d8d1cbb"
        }
    }
},
{
    "title": "Pyramids at Giza",
    "content": "The Giza Pyramids, built to endure an eternity, have done just that. The monumental tombs are relics of Egypt's Old Kingdom era and were constructed some 4,500 years ago. Egypt's pharaohs expected to become gods in the afterlife. To prepare for the next world they erected temples to the gods and massive pyramid tombs for themselves—filled with all the things each ruler would need to guide and sustain himself in the next world.",
    "imageURL": "https://cdn.mos.cms.futurecdn.net/YMa7Wx2FyjQFUjEeqa72Rm-1200-80.jpg",
    "country": {
        "connect": {
            "id": "64fed40b08000cacb5d1ffd5"
        }
    },
    "category": "Destination",
    "author": {
        "connect": {
            "id": "64fed24cf52a325a2d8d1cbb"
        }
    }
},
{
    "title": "Rio Carnival",
    "content": "The typical Rio carnival parade is filled with revelers, floats, and adornments from numerous samba schools which are located in Rio (more than 200 approximately, divided into five leagues/divisions). A samba school is composed of a collaboration of local neighbours that want to attend the carnival together, with some kind of regional, geographical and common background.",
    "imageURL": "https://www.rio-tickets.com/cdn/shop/files/WhatsApp_Image_2022-11-08_at_2.52.56_AM.jpg?v=1667898683&width=1280",
    "country": {
        "connect": {
            "id": "64fed40c08000cacb5d1ffd7"
        }
    },
    "category": "Event",
    "author": {
        "connect": {
            "id": "64fed24cf52a325a2d8d1cbb"
        }
    }
},
{
    "title": "Traditional Folk Song - Indian Folk Song",
    "songURL": "https://youtu.be/TlidRtgyfIs",
    "country": {
        "connect": {
            "id": "64fed40a08000cacb5d1ffd3"
        }
    },
    "category": "Music",
    "author": {
        "connect": {
            "id": "64fed24cf52a325a2d8d1cbb"
        }
    }
}
];

(async () => {
    for (const post of Posts) {
        await prisma.post.create({
            data: post
        })
    }
})()