import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import SpeechToText from "@/components/SpeechToText";

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
                    <SpeechToText setMessage={setMessage}/>
                    <Button
                        onClick={handleSubmit}
                        className="ml-2 bg-black text-white hover:bg-gray-400 hover:text-black"
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
