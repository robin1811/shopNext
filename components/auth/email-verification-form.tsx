'use client'

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { _success } from "zod/v4/core";
import { AuthCard } from "./auth-card";
import { FormSucces } from "./form-success";
import { FormError } from "./form-error";

export const EmailVerificationForm = () => {
    // to get token from the url
    const token = useSearchParams().get('token')
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVerification = useCallback(() => {
        if(success || error) return 
        if(!token){
            setError("No token found")
            return
        }
        newVerification(token).then((data) => {
            if(data.error){
                setError(data.error)
            }
            if(data.success){  
                setSuccess(data.success)
                router.push('/auth/login')
            }

        })

    },[])
        
    useEffect(()=>{
        handleVerification()
    },[])

    return (
    <AuthCard
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      cardTitle="Verify your account."
    >
      <div className="flex items-center flex-col w-full justify-center">
        <p>{!success && !error ? "Verifying email..." : null}</p>
        <FormSucces message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>)
}