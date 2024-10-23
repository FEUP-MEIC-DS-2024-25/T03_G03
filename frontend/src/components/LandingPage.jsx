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
    const [conversations, setConversations] = useState([]); // State for conversation pairs

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
            console.log(data); // Check the response data structure

            if (data) {
                // Append new conversation pair (user query and answer)
                setConversations((prevConversations) => [
                    ...prevConversations,
                    { query: message, answer: data },
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
        <div className="flex flex-col items-center w-full h-full p-24">
            {/* Conditional Rendering of Logo */}
            {conversations.length === 0 && (
                <>
                    <h1 className="mb-12 text-5xl font-extrabold uppercase">Speech2Req</h1>
                    <h2 className="text-2xl font-bold mb-12">What can I help you with?</h2>
                </>
            )}

            <div className="grid w-full gap-2 space-y-8">
                <div className="relative">
                    <Textarea
                        placeholder="Type your message here."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
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
                    </div>
                </div>
                <span className="w-full text-center bg-black text-white hover:bg-gray-400 hover:text-black">
                    <Button onClick={handleSubmit}>Send message</Button>
                </span>
            </div>

            {/* Stack of Answers */}
            {conversations.length > 0 && ( // Conditionally render the answers box
                <div className="mt-8 p-4 border border-gray-300 rounded bg-gray-100 w-full flex-grow overflow-auto">
                    <h3 className="font-semibold">Conversations:</h3>
                    <div className="flex flex-col space-y-2 mt-2">
                        {conversations.map((conv, index) => (
                            <div key={index} className="p-2 border-b border-gray-300">
                                <p className="font-bold">You: {conv.query}</p>
                                <p className="ml-4">Bot: {conv.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
