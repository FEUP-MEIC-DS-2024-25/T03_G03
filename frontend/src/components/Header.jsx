import { ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header({ user, isCollapsed, toggleCollapse }) {
    return (
        <div className={`absolute top-0 flex flex-row justify-between items-center transition-all duration-300 ease-in-out 
            ${!isCollapsed ? 'pl-16 pr-4' : 'pl-4 pr-4'} w-full`}>
            <div className={`flex flex-row space-x-2 items-center p-4 transition-all duration-300 ease-in-out 
                ${!isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-black">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleCollapse}
                        className="text-black hover:bg-gray-200 hover:text-black shrink-0"
                    >
                        {isCollapsed && <ChevronRight size={24} />}
                    </Button>
                </span>
                <span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("New Chat Button pressed")}
                        className="text-black hover:bg-gray-200 hover:text-black shrink-0"
                    >
                        <Plus size={24} />
                    </Button>
                </span>
                <p>Speech2Req</p>
            </div>
            <div className="mr-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={user['avatar']} alt="User Image" />
                            <AvatarFallback>{user['name']}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
