import { Request, Response } from "express"
import { prisma } from "../config/db"
import { config } from "dotenv"

config();

export const leaderboard = async(req:Request,res:Response) => {
    try {
        const heros = await prisma.hero.findMany({
            orderBy:{
                score:"desc"
            },
            select:{
                id:true,
                name:true,
                title:true,
                score:true,
                avatarUrl:true
            }
        })

        res.status(200).json({heros})
    } catch (error:any) {
        console.error("Leaderboard ",error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const updateScore = async(req:Request,res:Response) => {
    try {
        const {heroId,delta,adminPin} = req.body;

        const ADMIN_PIN = "1234";
        
        if(adminPin !== ADMIN_PIN) return res.status(401).json({message:"Unauthorized"});
        if(!heroId || typeof delta !== "number") return res.status(400).json({error:"hreoId and delat required"});

        const hero = await prisma.hero.update({
            where:{id:heroId},
            data:{
                score:{increment:delta}
            }
        })

        await prisma.scoreHistory.create({
            data:{
                heroId:hero.id,
                delta,
                newScore:hero.score,
                updatedBy:"admin"
            }
        })

        const leaderboard = await prisma.hero.findMany({
            orderBy:{score:"desc"},
            select:{
                id:true,
                name:true,
                title:true,
                avatarUrl:true,
                score:true
            }
        })

        res.status(200).json({hero,leaderboard})
    } catch (error:any) {
        console.error("UpdateScore error:-",error);
        res.status(500).json({ error: "Something went wrong" });
    }
}