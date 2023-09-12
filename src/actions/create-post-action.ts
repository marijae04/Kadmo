"use server"
import { Category, Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../app/db";

export async function createPostAction(obj: { title: string, content: string, imageURL: string, category: Category, country: string, songURL?: string }){
    try{
        console.log('Creating post...');
        const session = await getServerSession();
    
        if (!session?.user) {
            redirect('/sign-in')
        }

        const dbUser = await prisma.user.findUnique({ where: {email: session.user.email} });

        if(!dbUser){
            return { error: 'User not found'}
        }

        const country = await prisma.country.findFirst({ where: { name: obj.country } });

        await prisma.post.create({
            data:{
                title: obj.title,
                content: obj.content,
                imageURL: obj.imageURL,
                category: obj.category,
                countryId: country?.id!,
                authorId: dbUser.id,
                songURL: obj.songURL ?? ''
            }
        })
    }catch(error){
        console.log(error);
        return {error: 'Error creating posts'}
    }
}