"use server"

import crypto from 'crypto';
import { hash } from "../utils/helpers";
import prisma from '../app/db';

export async function registerUser(obj:{name: string, email:string, username: string, password:string}){
    "use server"
    try{
        const { name, email, username, password } = obj

        const hashedPassword = hash(password);

        const existingUser = await prisma.user.findUnique({ where: { username }})

        if(existingUser) return { error: 'User already exists'}

        //prisma save to database
        await prisma.user.create({data: { username, email, password: hashedPassword, name}})
        console.log("User created")
    }catch(error){
        console.log(error)
        if(error instanceof Error){
            return { error: error.message }
        }
        return { error: 'Unknown error'}
    }
}