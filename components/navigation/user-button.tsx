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

export const UserButton = ({user}:Session) => {
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
                    <DropdownMenuItem className="py-2 font-medium cursor-pointer transtion-all duration-300">
                        <div className="flex items-center group">
                            <Sun size={16} className="mr-1 group-hover:rotate-90 transition-all duration-300 ease-in-out"/>
                            <Moon size={16} className="mr-1 group-hover:rotate-180 transition-all duration-300 ease-in-out"/>
                            <p>
                                Theme
                            </p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className=" group focus:bg-destructive/30 py-2 font-medium cursor-pointer transtion-all duration-300">
                           <LogOut size={16} className="mr-4 group-hover:scale-75 transition-all duration-300 ease-in-out"/>Sign out       
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}