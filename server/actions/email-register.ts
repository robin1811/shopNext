"use server"
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from 'bcrypt';
import {db} from ".."
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";

const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async({email,name, password}) => {
    // we are hasing our passwords
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    // checking if the user exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })

    // double check -> if already in the db, than say it's in user, if also if it's not
    // then register the user and also send the verification

    if(existingUser){
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(email)
            // send email
            // await setVerficiationEmail()

            return {success : "Email Confirmation resent"}
        }
        return {error: 'Email already is use'}
    }
    // return{success: "Yayy!! You are one of us now"}

    // when the user is not registered
    await db.insert(users).values({
        email,
        name,
         password: hashedPassword, // ✅ Store the hashed password
    })
    const verificationToken = await generateEmailVerificationToken(email)
    // sending email if they just registered
    // await setVerficiationEmail();
    return {success : 'Confirmation Email Sent.'}
    }
)