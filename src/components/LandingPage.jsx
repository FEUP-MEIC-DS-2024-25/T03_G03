//Extra components
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Mic } from "lucide-react"

export default function LandingPage(){

    return(
        <div className="flex flex-col items-center w-full h-full p-24">
            <h1 className="mb-12 text-5xl font-extrabold uppercase">Speech2Req</h1>
            <h2 className="text-2xl font-bold mb-12">What can I help you with?</h2>
            <div className="grid w-full gap-2 space-y-8">
                <div className="relative">
                    <Textarea placeholder="Type your message here." />
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                        <Button
                            type="button"
                            size="sm"
                            onClick={() => console.log("Fodasi")}
                            className="rounded-full text-xs"
                        >
                            <span className="p-2 hover:bg-black hover:text-white rounded-full">
                                <Mic size={16}/>
                            </span>
                        </Button>
                    </div>  
                </div>
                <span className="w-full text-center bg-black text-white hover:bg-red-500">
                    <Button>Send message</Button>
                </span>
            </div>
        </div>
    ); 
}