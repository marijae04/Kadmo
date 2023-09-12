
"use server"
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../app/db";

export async function savePostAction(postId: string, save: boolean = true) {

    try {
        const session = await getServerSession();

        if (!session?.user) {
            redirect('/sign-in')
        }

        const user = session.user;

        if (!user.email) return { error: 'User not found' };

        const post = await prisma.post.findUnique({ where: { id: postId } });

        const dbUser = await prisma.user.findUnique({ where: { email: user.email }, include: { savedPosts: true, likedPosts: true } })

        if (!post || !dbUser) {
            return { error: 'Post not found' }
        }

        if (save) {
            //SAVE
            if (dbUser.savePostsIDs.includes(post.id)
                || post.savedByUsersIDs.includes(dbUser.id)) {
                console.log("User already saved post", post.id);
                return { error: 'User already saved post' }
            }

            await prisma.post.update({
                where: { id: post.id },
                data: {
                    savedByUsersIDs: {
                        push: dbUser.id
                    }
                }
            })

            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    savePostsIDs: {
                        push: post.id
                    }
                }
            })

            console.log("Successfully saved post", post.id);
        }else{
            //UNSAVE
            if (!dbUser.savePostsIDs.includes(post.id)
                && !post.savedByUsersIDs.includes(dbUser.id)) {
                console.log("User did not saved this post", post.id);
                return { error: 'User did not saved this post' }
            }

            await prisma.post.update({
                where: { id: post.id },
                data: {
                    savedByUsersIDs: {
                        set: post.savedByUsersIDs.filter(id => id !== dbUser.id)
                    }
                }
            })
            
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    savePostsIDs: {
                        set: dbUser.savePostsIDs.filter(id => id !== post.id)
                    }
                }
            })
        }



        return;

    } catch (error) {
        console.log(error);
        return { error: 'Error saving post!!' }
    }
}