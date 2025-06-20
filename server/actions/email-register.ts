"use server"
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from 'bcrypt';
import {db} from ".."
import { eq } from "drizzle-orm";
import { users } from "../schema";
// import { generateEmailVerificationToken } from "./tokens";

const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async({email,name, password}) => {
    // we are hasing our passwords
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    // checking if the user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })

    if(existingUser){
        return {error: 'Email already is use'}
    }

    return {success : 'Confirmation Email Sent.'}
    }
)