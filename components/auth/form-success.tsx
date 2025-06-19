import { CheckCircle2 } from "lucide-react"

export const FormSucces = ({message} : {message?: string}) =>{
    if(!message) return null

    return(
        <div className="bg-teal-400/25 flex  text-xs font-medium items-center my-5 gap-2 text-secondary-foreground p-3 rounded-md">
            <CheckCircle2 className="w-4 h-4"></CheckCircle2>
            <p>{message}</p>
        </div>
        
    )
}