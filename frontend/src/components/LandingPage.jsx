// Extra components
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mic } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function LandingPage() {
    const [message, setMessage] = useState("");
    const [conversations, setConversations] = useState([]);

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
                console.error("Failed to fetch:", response.status);
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
                                <p className="ml-4">Bot: {conv.answer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Bar */}
            <div className={`relative p-4 ${conversations.length === 0 ? 'flex justify-center flex-col items-center' : ''}`}>
                <Textarea
                    placeholder="Type your message here."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full"
                />
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
                        className="ml-2 bg-black text-white hover:bg-gray-400 hover:text-black"
                    >
                        Send message
                    </Button>
                </div>
            </div>
        </div>
    );
}
