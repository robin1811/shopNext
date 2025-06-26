"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Switch } from "../ui/switch";

export const UserButton = ({user}:Session) => {
    const {setTheme, theme} = useTheme();
    const [checked, setChecked] = useState(false)

    function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true)
      case "light":
        return setChecked(false)
      case "system":
        return setChecked(false)
    }
  }

   

    // <div>
    //     <h1>{user?.email}</h1>
    //     <button onClick={()=> signOut()} >Sign out</button>
    // </div>
    if(user){
        
        return(
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    <Avatar>
                        {/* if image is there */}
                        {user.image && (
                            <Image src={user.image} alt={"user.name"} fill={true}/>
                        )}
                        {/* if no image then the first letter only fallback */}
                        {!user.image && <AvatarFallback className="bg-primary/25">
                            <div className="font-bold">
                                {user.name?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            </AvatarFallback>}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-6" align="end">
                    <div className="mb-4 p-4 flex flex-col items-center gap-1 rounded-lg bg-destructive/10">
                        {user.image && (
                            <Image src={user.image} alt={"user.name"} className="rounded-full" width={36} height={36}/>
                        )}
                        <p className="font-bold text-xs">{user.name}</p>
                        <span className="text-xs font-medium text-secondary-foreground">{user.email}</span>
                    </div>
                    <DropdownMenuSeparator />
                    {/* group is like a wrapper, whatever you write in it poitns to each member in it */}
                    <DropdownMenuItem className="group py-2 font-medium cursor-pointer transtion-all duration-300"> 
                        <TruckIcon size={16} className=" mr-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"/>My Orders</DropdownMenuItem>
                    <DropdownMenuItem className=" group py-2 font-medium cursor-pointer transtion-all duration-300">
                        <Settings size={16} className="mr-4 group-hover:rotate-180 transition-all duration-300 ease-in-out"/> Settings</DropdownMenuItem>
                    
                    
                    {theme && (
                    <DropdownMenuItem className="py-2 font-medium cursor-pointer transtion-all duration-300 ease-in-out">
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center group">
                            <div  className="relative flex mr-3">
                                <Sun size={16} className="mr-1 group-hover:text-yellow-600 group-hover:rotate-180 dark:scale-0 dark:rotate-90 transition-all duration-300 ease-in-out absolute"/>
                                <Moon size={16} className="mr-1 group-hover:text-blue-400 dark:scale-100 scale-0 transition-all duration-300 ease-in-out"/>
                            </div>
                            
                            <p className="dark:text-blue-400 mr-3 text-secondary-foreground/75   text-yellow-600">
                                    {theme[0].toUpperCase() + theme.slice(1)} Mode
                            </p>
                            <Switch
                                className="scale-75 "
                                checked={checked}
                                onCheckedChange={(e) => {
                                setChecked((prev) => !prev)
                                if (e) setTheme("dark")
                                if (!e) setTheme("light")
                            }}
                            />
                        </div>
                    </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => signOut()} className=" group focus:bg-destructive/30 py-2 font-medium cursor-pointer transtion-all duration-300">
                           <LogOut size={16} className="mr-4 group-hover:scale-75 transition-all duration-300 ease-in-out"/>Sign out       
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}