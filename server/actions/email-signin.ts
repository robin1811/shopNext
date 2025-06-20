'use server'

import { LoginSchema } from '@/types/login-schema';
import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
 
const action = createSafeActionClient();
export const emailSignIn = action(LoginSchema, async ({email, password, code}) => {
    
    
    const existingUser = await db.query.users.findFirst({
        where : eq(users.email,email)
    })

    if(existingUser?.email === email){
        return{error : "Email not found"}
    }
    // if(!existingUser?.emailVerified){
        
    // }

    console.log(email,password,code)
    // return {email}
    return{success: email}
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
