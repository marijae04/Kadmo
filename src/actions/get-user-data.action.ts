"use server"

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUserData() {
    try{
        console.log('Getting user liked posts...');
        const session = await getServerSession();
    
        if (!session?.user) {
            redirect('/sign-in')
        }

        const dbUser = await prisma.user.findUnique({ id: session.user.id });

        if(!dbUser){
            return { error: 'User not found'}
        }

        delete dbUser.password;

        return dbUser;
    }catch(error){
        console.log(error);
        return {error: 'Error getting user liked posts'}
    }
}