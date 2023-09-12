"use server"
import { Category, Post, User } from "@prisma/client";
import prisma from "../app/db";
import { Continent } from "../enums/continent.enum";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export async function getPostsAction(filters?: { continent?: Continent, country?: string, category?: Category, type?: "My posts" | "Saved posts" | "Liked posts"}){
    try{

        const session = await getServerSession();

        if (!session?.user) {
            redirect('/sign-in')
        }

        const user = session.user;

        if (!user.email) return { error: 'User not found' };

        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

        if(!dbUser){
            return { error: 'User not found'}
        }

        console.log("Getting posts");

        const where: any= {};
        if(filters?.continent) where.continent = filters.continent;
        if(filters?.country) where.country = filters.country;
        if(filters?.category) where.category = filters.category;

        let posts:Post[] = []

        if (filters?.type) {
            if(filters?.type === "My posts"){
                posts = await prisma.post.findMany({where: { author: { email: dbUser.email }},  include: { author: true, country: true}});
            }else if(filters?.type === "Saved posts"){
                posts = await prisma.post.findMany({where: { savedByUsersIDs: { has: dbUser.id }},  include: { author: true, country: true}});
            }else if(filters?.type === "Liked posts"){
                posts = await prisma.post.findMany({where: { likedByUsersIDs: { has: dbUser.id }},  include: { author: true, country: true}});
            }
        }else{
            posts = await prisma.post.findMany({where: where as any,  include: { author: true, country: true}});
        }

        
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