// Extra components
import  ExpandingTextarea  from "@/components/ui/expanding-textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Mic } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

//Notifications 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage() {
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const disableTimerMult = useRef(5); 
    const disabeTimerCntr = useRef(0); 

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

            if (!response.ok) {

                if(disabeTimerCntr.current === 3){
                    toast.error('Error sending prompt to backend. Please try again later.');
                    setDisabled(true); 
                } 
                else{
                    toast.error('Error sending prompt to backend. Retrying in ' + (disableTimerMult.current) + ' seconds.', {
                        autoClose: disableTimerMult.current * 1000
                    });

                    //Set the button to disabled for X seconds
                    setDisabled(true);

                    //Reenable the button after X seconds
                    setTimeout(() => {
                        setDisabled(false);
                    }
                    , disableTimerMult.current * 1000);

                    disabeTimerCntr.current += 1;
                    disableTimerMult.current += 5;
                }
                
                return;
            }

            const data = await response.json();
            console.log(data); 

            if (data) {
                // Append new conversation pair (user query and answer)
                setConversations((prevConversations) => [
                    ...prevConversations,
                    { query: message, answer: data }
                ]);
            } else {
                console.error("No answer in response:", data);
                setConversations((prevConversations) => [
                    ...prevConversations,
                    { query: message, answer: "No answer received." }
                ]);
            }

            setMessage(""); // Clear the message after sending
        } catch (error) {
            console.error("Error submitting prompt to backend:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full max-w-4xl mx-auto">
            {/* Header and Input Area */}
            <div className={`flex flex-col items-center justify-center ${conversations.length === 0 ? 'h-1/2' : 'h-1/4'}`}>
                {conversations.length === 0 && (
                    <>
                        <h1 className="mb-2 text-5xl font-extrabold uppercase">Speech2Req</h1>
                        <h2 className="text-2xl font-bold mb-4">What can I help you with?</h2>
                    </>
                )}
            </div>

            {/* Stack of Answers */}
            <div className={`flex-grow p-4 border border-gray-300 rounded bg-gray-100 overflow-auto ${conversations.length === 0 ? 'hidden' : ''}`}>
                {conversations.length > 0 && (
                    <div className="flex flex-col space-y-2">
                        {conversations.map((conv, index) => (
                            <div key={index} className="p-2 border-b border-gray-300">
                                <p className="font-bold">You: {conv.query}</p>
                                <p className="ml-4">Bot:</p>
                                <ReactMarkdown className="markdown">{conv.answer}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Bar */}
            <div className={`relative p-4 ${conversations.length === 0 ? 'flex justify-center flex-col items-center' : ''}`}>
                <div className="w-full">
                    <ExpandingTextarea
                        handleSubmit={handleSubmit}
                        message={message}
                        setMessage={setMessage}
                        placeholder = {"Type a message..."}
                    />
                </div>
                <div className="flex justify-center mt-2">
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                type="button"
                                size="sm"
                                className="rounded-full text-xs"
                            >
                                <span className="p-2 hover:bg-black hover:text-white rounded-full">
                                    <Mic size={16} />
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

                    <Button
                        onClick={handleSubmit}
                        disabled={disabled}
                        //If it is disabled, change the color to gray
                        className={`ml-2 bg-black text-white dark:text-white-200 hover:bg-gray-400 hover:text-black ${disabled ? "bg-gray-300" : ""}`}
                    >
                        Send message
                    </Button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
        </div>
    );
}
