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
import { FormError } from "./form-error"
import { FormSucces } from "./form-success"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : "",
        },
    });

    const[error, setError] = useState("");
    const[success, setSuccess] = useState("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const {execute,status, result} = useAction(emailSignIn,{
        onSuccess(data){
            if (data?.error) setError(data.error)
            if (data?.success) {
            setSuccess(data.success)
            }
            if(data.twoFactor) setShowTwoFactor(true)
        //  console.log(data);   
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
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>Check we've have sent you two factor to your email!!!</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                        disabled={status === "executing"}
                                        {...field}
                                        maxLength={6}
                                        >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                            </FormItem>
                        )}
                            />
                      )}
                        {!showTwoFactor && (
                        <>
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
                     </>
                     )}
                        <FormSucces message={success}/>
                        <FormError message={error}/>
                        <Button size={'sm'} className="px-0" variant={"link"} asChild>
                            <Link href="/auth/reset">Forgot your password</Link>
                        </Button>

                    </div>
                    <Button type="submit" className={cn("w-full my-4", status=== 'executing' ? 'animate-pulse' : "")}>
                        {showTwoFactor ? "Verify" : "Sign In"}
                    </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}