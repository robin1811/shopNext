'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {zodResolver} from '@hookform/resolvers/zod'
import { AuthCard } from "../auth/auth-card"
import { RegisterSchema } from "@/types/register-schema"
import * as z from 'zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/actions/email-signin"
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { emailRegister } from "@/server/actions/email-register"
import { FormSucces } from "./form-success"
import { FormError } from "./form-error"




// export const RegisterForm = () => {
//     const form = useForm(<z.infer<typeof RegisterSchema>>({
//         resolver : zodResolver(RegisterSchema),
//         defaultValues : {

//         },
//     })

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })
    const[error, setError] = useState("");
    const[success, setSuccess] = useState('');
    const {execute, status} = useAction(emailRegister,{
        onSuccess(data){
            if(data.error){
                setError(data.error)
            }
            if(data.success){
                setSuccess(data.success);
            }
        },
    })

    const onSubmit = (values : z.infer <typeof RegisterSchema>) => {
        // console.log(values);
        console.log('before the server action');
        execute(values)
    }
    return(
        <AuthCard cardTitle="Create an account 🎊" backButtonHref="/auth/login" backButtonLabel="Already have an account? Login Here" showSocials>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                     <div>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>UserName</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="fusionLogic" type="text"></Input>
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
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
                    <FormSucces message= {success}/>
                    <FormError message= {error}/>
                    {/* <Button size={'sm'} variant={"link"} asChild>
                        <Link href="/auth/reset">Forgot your password</Link>
                    </Button> */}
 
                     </div>
                    <Button type="submit" className={cn("w-full my-2", status=== 'executing' ? 'animate-pulse' : "")}>Register</Button>
                    </form>
                </Form> 
            </div>
        </AuthCard>
    )
}