import { Post } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createPost(post: Post){
    try{
        console.log('Creating post...');
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