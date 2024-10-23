import { ChevronRight, Plus, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

import DarkModeToggle from "@/components/DarkModeToggle"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Header({ user = { name: "User", avatar: "/placeholder.svg?height=40&width=40" }, isCollapsed = false, toggleCollapse = () => {} }) {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div className={`absolute top-0 flex flex-row justify-between items-center transition-all duration-300 ease-in-out 
            ${!isCollapsed ? 'pl-16 pr-4' : 'pl-4 pr-4'} w-full`}>
            <div className={`flex flex-row space-x-2 items-center p-4 transition-all duration-300 ease-in-out 
                ${!isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleCollapse}
                        className="text-foreground hover:bg-accent hover:text-accent-foreground shrink-0"
                    >
                        {isCollapsed && <ChevronRight size={24} />}
                    </Button>
                    <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                        <div className="bg-popover text-popover-foreground rounded-md shadow-md p-2 text-sm flex items-center space-x-2 whitespace-nowrap">
                            <span>Open sidebar</span>
                        </div>
                        <div className="absolute left-4 -top-2 w-3 h-3 bg-popover rotate-45 transform origin-center"></div>
                    </div>
                </div>
                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("New Chat Button pressed")}
                        className="text-foreground hover:bg-accent hover:text-accent-foreground shrink-0"
                    >
                        <Plus size={24} />
                    </Button>
                    <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                        <div className="bg-popover text-popover-foreground rounded-md shadow-md p-2 text-sm flex items-center space-x-2 whitespace-nowrap">
                            <span>New chat</span>
                        </div>
                        <div className="absolute left-4 -top-2 w-3 h-3 bg-popover rotate-45 transform origin-center"></div>
                    </div>
                </div>
                <p>Speech2Req</p>
            </div>
            <div className="flex flex-row space-x-4 items-center mr-4">

                {/* Darkmode */}
                <DarkModeToggle/>

                {/* Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={user.avatar} alt="User Image" />
                            <AvatarFallback>{user.name}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User size={16} className="mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onSelect={() => setDialogOpen(true)}>
                            <Settings size={16} className="mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <LogOut size={16} className="mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                            TODO
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}