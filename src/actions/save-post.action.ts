import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../app/db";

export async function savePostAction(postId: string) {

    try{
        const session = await getServerSession();

        if (!session?.user) {
            redirect('/sign-in')
        }
    
        const user = session.user;
    
        if(!user.email) return { error: 'User not found' };
    
        const post = await prisma.post.findUnique({ where: { id: postId } });
    
        const dbUser = await prisma.user.findUnique({ where: { email: user.email }, include: { likedPosts: true }})
    
        if (!post || !dbUser) {
            return { error: 'Post not found' }
        }
        
        dbUser.likedPosts.push(post);

        const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: { likedPosts: { connect: { id: post.id } } }
        });
    }catch(error){
        console.log(error);
        return { error: 'Error saving post' }
    }
}