//Extra components
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import { Mic } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function LandingPage(){

    const [message, setMessage] = useState(""); 
    
    const handleSubmit = async () => {
        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL;  
          const response = await fetch(`${backendUrl}/api/prompt`, { 
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: message,
              }),
          });
  
          const data = await response.json(); 
          console.log(data); // Handle the response from the backend
        } catch (error) {
          console.error("Error submiting prompt to backend:", error);
        }
      };
  

    return(
        <div className="flex flex-col items-center w-full h-full p-24">
            <h1 className="mb-12 text-5xl font-extrabold uppercase">Speech2Req</h1>
            <h2 className="text-2xl font-bold mb-12">What can I help you with?</h2>
            <div className="grid w-full gap-2 space-y-8">
                <div className="relative">
                    <Textarea placeholder="Type your message here."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                        <Dialog>
                        <DialogTrigger>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => console.log("Adoro DS")}
                                className="rounded-full text-xs"
                            >
                                <span className="p-2 hover:bg-black hover:text-white rounded-full">
                                    <Mic size={16}/>
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Text to Speech?</DialogTitle>
                            <DialogDescription> 
                                This feature is not available yet.
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                        </Dialog>
                    </div>  
                </div>
                <span className="w-full text-center bg-black text-white hover:bg-gray-400 hover:text-black">
                    <Button onClick={handleSubmit}>Send message</Button>
                </span>
            </div>
        </div>
    ); 
}