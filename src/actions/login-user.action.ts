"use server"

import prisma from "../app/db"
import { hash } from "../utils/helpers"

export async function loginUser(obj:{username: string, password:string}){
    "use server"
    try{
        const { username, password } = obj

        const user = await prisma.user.findUnique({where: {username}})

        if(!user){
            return { error: 'User not found'}
        }

        const hashedPassword = hash(password);

        if(user.password !== hashedPassword){
            return { error: 'Invalid password'}
        }

        console.log("Successful login");
        return user;

    }catch(error){
        console.log(error)
        if(error instanceof Error){
            return { error: error.message }
        }
        return { error: 'Unknown error'}
    }
}