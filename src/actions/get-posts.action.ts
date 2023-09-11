"use server"
import { Category } from "@prisma/client";
import prisma from "../app/db";
import { Continent } from "../enums/continent.enum";

export async function getPostsAction(filters?: { continent?: Continent, country?: string, category?: Category}){
    try{
        console.log("Getting posts")
        const where:Partial<typeof filters> = {};
        if(filters?.continent) where.continent = filters.continent;
        if(filters?.country) where.country = filters.country;
        if(filters?.category) where.category = filters.category;
        
        const posts = await prisma.post.findMany({where: where as any,  include: { author: true, country: true}});
        console.log("Got posts")
        // console.log(posts);
        return { posts }
    }catch(error){
        console.log(error);
        if(error instanceof Error){
            return { error: error.message }
        }
        return { error: 'Unknown error'}
    }
}