import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Mic, StopCircle } from "lucide-react";
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
    const [isRecording, setIsRecording] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false); // New state for dialog open
    const recognitionRef = useRef(null);    
    const [language, setLanguage] = useState('en-US'); // Default language

    //Detect if the browser is Brave
    const isBrave = (window.navigator.brave != undefined && window.navigator.brave.isBrave.name == "isBrave") 
    const [isBraveBrowser, setIsBraveBrowser] = useState(isBrave);
    
    //Live Audio
    const [audio, setAudio] = useState(null); 

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

    // Speech-to-text functionality

    const startRecording = async () => {

        console.log("Started recording"); 

        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = language; // Set the recognition language to the selected one

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            setMessage((prevMessage) => prevMessage + transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start(); // Start recording automatically
    };

    const stopRecording = () => {

        console.log("Stop recording triggered");

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
            setDialogOpen(false); // Close the dialog when stopping recording
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
                <Dialog 
                    open={dialogOpen} 
                    onOpenChange={setDialogOpen}
                >
                    <DialogTrigger>
                        <Button
                            type="button"
                            size="sm"
                            className="rounded-full text-xs"
                            disabled={isRecording}
                            onClick={() => {
                                if(isBraveBrowser){
                                    toast.error('Speech-to-text is not supported in Brave browser. Please use a different browser.');
                                }
                            }}
                        >
                            <span className={`p-2 hover:bg-black hover:text-white rounded-full ${isRecording ? 'bg-red-500 text-white' : ''}`} >
                                <Mic size={16} />
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Speech-to-Text</DialogTitle>
                            <DialogDescription>
                                {isRecording ? (
                                    <Button
                                        onClick={stopRecording}
                                        className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                        <StopCircle size={16} className="mr-2" />
                                        Stop Recording
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={startRecording}
                                        disabled={isBraveBrowser}
                                        className={`bg-black text-white hover:bg-red-500 hover:text-black ${isBraveBrowser ? 'bg-gray-400' : ''}`}
                                    >
                                        Start Recording
                                    </Button>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">Select Language</label>
                            <select
                                id="language-select"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="en-US">English</option>
                                <option value="es-ES">Spanish</option>
                                <option value="fr-FR">French</option>
                                <option value="de-DE">German</option>
                                <option value="pt-PT">Portuguese</option>
                                {/* Add more languages as needed */}
                            </select>
                        </div>
                    </DialogContent>
                </Dialog>

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
