import prisma from "../app/db";
import { Continent } from "../enums/continent.enum";

export async function getPostsAction(filters?: { continent?: Continent, country?: string}){
    try{
        const posts = await prisma.post.findMany({});
        console.log(posts);
        return { posts }
    }catch(error){
        console.log(error);
        if(error instanceof Error){
            return { error: error.message }
        }
        return { error: 'Unknown error'}
    }
}