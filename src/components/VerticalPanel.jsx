import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageSquare, Plus } from 'lucide-react'

export default function VerticalSidePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-xl font-bold">v0</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="text-white hover:bg-gray-800"
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <Button className="w-full justify-start gap-2 bg-white text-black hover:bg-gray-200">
            <Plus size={20} />
            {!isCollapsed && "New Chat"}
          </Button>
        </div>
        
        <nav className="mt-4">
          {[1, 2, 3].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isCollapsed ? 'px-2' : 'px-4'}`}
            >
              <MessageSquare size={20} />
              {!isCollapsed && `Chat ${item}`}
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:bg-gray-800">
          {isCollapsed ? (
            <img src="/placeholder.svg?height=32&width=32" className="rounded-full" alt="User" />
          ) : (
            <>
              <img src="/placeholder.svg?height=32&width=32" className="rounded-full" alt="User" />
              <span>User Name</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}