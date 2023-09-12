"use server"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../app/db";

export async function likePostAction(postId: string, like: boolean = true) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            redirect('/sign-in')
        }

        const user = session.user;

        if (!user.email) return { error: 'User not found' };

        const post = await prisma.post.findUnique({ where: { id: postId } });

        const dbUser = await prisma.user.findUnique({ where: { email: user.email }, include: { likedPosts: true } })

        if (!post || !dbUser) {
            return { error: 'Post not found' }
        }

        if (like) {
            //LIKE
            if (dbUser.likedPostIDs.includes(post.id)
                || post.likedByUsersIDs.includes(dbUser.id)) {
                console.log("User already liked post", post.id);
                return { error: 'User already liked post' }
            }

            await prisma.post.update({
                where: { id: post.id },
                data: {
                    likedByUsersIDs: {
                        push: dbUser.id
                    }
                }
            })

            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    likedPostIDs: {
                        push: post.id
                    }
                }
            })

            console.log("Successfully liked post", post.id);
        }else{
            //UNLIKE
            if (!dbUser.likedPostIDs.includes(post.id)
                && !post.likedByUsersIDs.includes(dbUser.id)) {
                console.log("User does not like this post", post.id);
                return { error: 'User does not like this post' }
            }

            await prisma.post.update({
                where: { id: post.id },
                data: {
                    likedByUsersIDs: {
                        set: post.likedByUsersIDs.filter(id => id !== dbUser.id)
                    }
                }
            })
            
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    likedPostIDs: {
                        set: dbUser.likedPostIDs.filter(id => id !== post.id)
                    }
                }
            })
        }



        return;

    } catch (error) {
        console.log(error);
        return { error: 'Error liking post' }
    }
}