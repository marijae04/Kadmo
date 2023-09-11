"use server"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUserLikedPostsAction(){
    try{
        console.log('Getting user liked posts...');
        const session = await getServerSession();
    
        if(!session?.user){
            redirect('/sign-in')
        }

        const user = session.user;

        console.log(`Getting posts for user: ${user.name}`, user)

        const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: {
                likedPosts: true
            }
        });

        console.log("User liked posts", dbUser.likedPosts)

        return dbUser.likedPosts;
    }catch(error){
        console.log(error);
        return {error: 'Error getting user liked posts'}
    }
}