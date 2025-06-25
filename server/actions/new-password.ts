'use server'

import { NewPasswordSchema } from "@/types/new-password-schema"
import { createSafeActionClient } from "next-safe-action"
import { getPasswordResetTokenByToken } from "./tokens"
import { eq } from "drizzle-orm"
import { db } from ".."
import { passwordResetTokens, users } from "../schema"
import bcrypt from 'bcrypt';
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

const action = createSafeActionClient()

export const newPassword = action(
  NewPasswordSchema,
  async ({ password, token }) => {
    const pool = new Pool({ connectionString: process.env.POSTGRES_URL })
    const dbPool = drizzle(pool)
    //TO CHECK THE TOKEN
    if (!token) {
      return { error: "Missing Token" }
    }
    //HERE we need to check if the token is valid
    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) {
      return { error: "Token not found" }
    }
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
      return { error: "Token has expired" }
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    })

    if (!existingUser) {
      return { error: "User not found" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // set the new password and also delete the token from db, we'll use a transaction (it is like if all the things shall work out not just one.0
    // if one fails all fail)
    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id))
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id))
    })
    return { success: "Password updated" }
  }
)
