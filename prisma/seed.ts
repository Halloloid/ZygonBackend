import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config()
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({adapter});

async function main() {
    const heros = [
        {
          name: "House Navika",
          title: "House Navika",
          avatarUrl: "/glimpses/navi.png",
          score: 1,
        },
        {
          name: "House Utkarsh",
          title: "House Utkarsh",
          avatarUrl: "/glimpses/utka.png",
          score: 2,
        },
        {
          name: "House Veerya",
          title: "House Veerya",
          avatarUrl: "/glimpses/veer.png",
          score: 3,
        },
        {
          name: "House Shaurya",
          title: "House Shaurya",
          avatarUrl: "/glimpses/shaurya.png",
          score: 4,
        },
    ];

    for (const hero of heros){
        await prisma.hero.create({data:hero})
    }

    console.log("Seeded 4 Heros")
}

main()
.catch((e)=>console.error(e))
.finally(async()=>{
    await prisma.$disconnect();
})