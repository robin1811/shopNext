import {auth} from '@/server/auth';
import { UserButton } from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn } from "lucide-react";
import Logo from './logo';


export default async function Nav(){
    const session = await auth();
    // console.log(session)

    return(
        <header className='py-8'>
            <nav>
                <ul className='flex justify-between'>
                    <li>
                        <Link href={"/"}>
                        <Logo></Logo>
                        </Link>
                    </li>
                    {!session ?(
                        <li>
                            <Button asChild>
                                <Link className="flex gap-2" href="/auth/login" ><LogIn size={16} /> <span>Login</span></Link>
                            </Button>
                        </li>
                    ):
                    <li><UserButton expires={session?.expires!} user={session?.user}></UserButton></li>}
                    
                </ul>
            </nav> 
        </header>
    )
}