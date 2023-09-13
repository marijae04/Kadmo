"use server"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { hash } from "../utils/helpers";
import prisma from "../app/db";

export async function updateProfileDataAction (obj: { name: string, username: string, password: string }){
    try{
        console.log('Updating profile data...');
        const session = await getServerSession();
    
        if (!session?.user) {
            redirect('/sign-in')
        }

        const dbUser = await prisma.user.findUnique({ where: {email: session.user.email} });

        if(!dbUser){
            return { error: 'User not found'}
        }
        
        const dataForUpdating:any = {};

        const name = obj?.name?.trim();
        const username = obj?.username?.trim();
        const password = obj?.password?.trim();

        if(name) dataForUpdating.name = obj.name;
        if(username) dataForUpdating.username = obj.username;
        if(password) dataForUpdating.password = hash(obj.password);

        console.log('OVDE', dataForUpdating)

        await prisma.user.update({
            where: {
                id: dbUser.id
            },
            data: dataForUpdating
        })
    }catch(error){
        console.log(error);
        return {error: 'Error updating profile data'}
    }
}