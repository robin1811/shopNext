import {auth} from '@/server/auth';
import { UserButton } from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn } from "lucide-react";
import Logo from './logo';
import CartDrawer from "../cart/cart-drawer"


export default async function Nav(){
    const session = await auth();
    // console.log(session)

    return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between items-center md:gap-8 gap-4">
          <li className="flex flex-1">
            <Link href="/" aria-label="sprout and scribble logo">
              <Logo />
            </Link>
          </li>
          <li className="relative flex items-center hover:bg-muted">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild>
                <Link className="flex gap-2" href="/auth/login">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton expires={session?.expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
    // return(
    //     <header className='py-8'>
    //         <nav>
    //             <ul className='flex justify-between items-center md:gap-8 gap'>
    //                 <li>
    //                     <Link href={"/"} aria-label='shopNext logo'>
    //                     <Logo />
    //                     </Link>
    //                 </li>
    //                 <li className='relative flex items-center hover:bg-muted'>
    //                     <CartDrawer/>
    //                 </li>
    //                 {!session ?(
    //                     <li>
    //                         <Button asChild>
    //                             <Link className="flex gap-2" href="/auth/login" ><LogIn size={16} /> <span>Login</span></Link>
    //                         </Button>
    //                     </li>
    //                 ):
    //                 <li><UserButton expires={session?.expires!} user={session?.user}></UserButton></li>}
                    
    //             </ul>
    //         </nav> 
    //     </header>
    // )
}