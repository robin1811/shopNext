'use server'

import { LoginSchema } from '@/types/login-schema';
import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './email';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
 
const action = createSafeActionClient();
export const emailSignIn = action(LoginSchema, async ({email, password, code}) => {
    try{
        // checking if user in db
        const existingUser = await db.query.users.findFirst({
            where : eq(users.email,email)
        })
        // checking email
        if(existingUser?.email !== email){
            return{error : "Email not found"}
        }
        // checking if user is verified
        if (!existingUser?.emailVerified) {
            const verificationToken = await generateEmailVerificationToken(existingUser.email)
            await sendVerificationEmail(verificationToken[0].email,verificationToken[0].token)
            return { success: "Confirmation Email Sent!" }
        }

        // console.log(email,password,code)
        // return {email}
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",})
        return{success: email}
    }
    catch(error){
        console.log(error)
        if(error instanceof AuthError){
            switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" }
          case "AccessDenied":
            return { error: error.message }
          case "OAuthSignInError":
            return { error: error.message }
          default:
            return { error: "Something went wrong" }
        }
        }
        throw error
    }
    
})


// 'use server'

// import { LoginSchema } from '@/types/login-schema';
// import { createSafeActionClient } from 'next-safe-action';
// import type { z } from 'zod';

// const actionClient = createSafeActionClient();

// export const emailSignIn = actionClient.action(
//   LoginSchema,
//   async ({ email, password, code }: z.infer<typeof LoginSchema>) => {
//     console.log(email, password, code);
//     return { email };
//   }
// );
// email-signin.ts
// 'use server'

// import { createSafeAction } from 'next-safe-action';
// import { LoginSchema } from '@/types/login-schema';

// export const emailSignIn = createSafeAction(LoginSchema, async ({ email, password, code }) => {
//   console.log(email, password, code);
//   return { email };
// });
