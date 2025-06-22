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

import { ResetSchema } from "@/types/reset-schema"
import { reset } from "@/server/actions/password-reset"




export const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

//   const searchParams = useSearchParams()
//   const token = searchParams.get("token")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  /////
  const { execute, status } = useAction(reset, {
    onSuccess(data) {
      if (data?.error) setError(data.error)
      if (data?.success) {
        setSuccess(data.success)
      }
    },
  })
////
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    // execute({ password: values.password, token })
    execute(values)
  }

  return (
    <AuthCard
      cardTitle="Forgot Your Password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    //   showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="shopnext@shopnext.com"
                        type="email"
                        autoComplete="email"
                        disabled={status === "executing"}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSucces message={success} />
              <FormError message={error} />
              {/* <Button size={"sm"} variant={"link"} asChild>
                <Link href="/auth/reset">Forgot your password</Link>
              </Button> */}
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Send Password Reset Email
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  )
}
