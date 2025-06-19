'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {zodResolver} from '@hookform/resolvers/zod'
import { AuthCard } from "../auth/auth-card"
import { LoginSchema } from "@/types/login-schema"
import * as z from 'zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/actions/email-signin"
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { useState } from "react"




export const LoginForm = () => {
    const form = useForm({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : "",
        },
    });

    const[error, setError] = useState("");

    const {execute,status, result} = useAction(emailSignIn,{
        onSuccess(data){
         console.log(data);   
        }
    })

    const onSubmit = (values : z.infer <typeof LoginSchema>) => {
        // console.log(values);
        execute(values)
    }
    return(
        <AuthCard cardTitle="Welcome Back!" backButtonHref="/auth/register" backButtonLabel="Create a new account" showSocials>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                     <div>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="shopnext@shopnext.com" type="email" autoComplete="email"></Input>
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="********" type="password" autoComplete="current-password"></Input>
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button size={'sm'} variant={"link"} asChild>
                        <Link href="auth/reset">Forgot your password</Link>
                    </Button>

                     </div>
                    <Button type="submit" className={cn("w-full my-2", status=== 'executing' ? 'animate-pulse' : "")}>Login</Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}