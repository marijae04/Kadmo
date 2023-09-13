"use server"

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../app/db";

export async function getUserData() {
    try{
        console.log('Getting user liked posts...');
        const session = await getServerSession();
    
        if (!session?.user) {
            redirect('/sign-in')
        }

        const dbUser = await prisma.user.findUnique({where: { email: session.user.email }});

        if(!dbUser){
            return { error: 'User not found'}
        }

        delete (dbUser as any).password;

        return dbUser;
    }catch(error){
        console.log(error);
        return {error: 'Error getting user liked posts'}
    }
}