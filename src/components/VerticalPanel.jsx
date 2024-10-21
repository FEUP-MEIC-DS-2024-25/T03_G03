import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageSquare, Plus } from 'lucide-react'

export default function VerticalSidePanel({ user, isCollapsed, toggleCollapse }) {

  return (
    <div className="relative h-screen">
      <div
        className={`
          flex flex-col h-full bg-black text-white transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'}
        `}
      >
        <div className="flex items-center justify-between p-4 whitespace-nowrap">
          <h1 className="text-xl font-bold">Speech2Req</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="text-white hover:bg-gray-200 hover:text-black shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft size={24} />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            <Button className="w-full justify-start gap-2 bg-white text-black hover:bg-gray-200 whitespace-nowrap">
              <Plus size={20} />
              <span>New Chat</span>
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-2 mx-4 mt-4">
            <p className="whitespace-nowrap">Previous Chats</p>
            {Array.from({ length: 100 }, (_, index) => index + 1).map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="w-full justify-start gap-2 text-white hover:bg-gray-200 hover:text-black whitespace-nowrap"
              >
                <MessageSquare size={20} />
                <span>Chat {item}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}