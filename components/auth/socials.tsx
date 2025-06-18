"use client"

import { Sign } from "crypto"
import { Button } from "../ui/button"
import { redirect } from "next/dist/server/api-utils"
import { signIn } from "next-auth/react"
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'

export default function Socials(){
    return(
        <div className="flex flex-col items-center w-full gap-4">
            <Button variant={"outline"} className="flex gap-4 w-full bg-white" onClick={() => signIn('google',{redirect:false, callbackUrl:"/",})}><p>Sign in with Google</p><FcGoogle className="w-5 h-5"></FcGoogle></Button>
            <Button variant={"outline"} className="flex gap-4 w-full bg-white" onClick={() => signIn('github',{redirect:false, callbackUrl:"/",})}><p>Sign in with GitHub</p><FaGithub className="w-5 h-5"></FaGithub></Button>
        </div>
    )
}