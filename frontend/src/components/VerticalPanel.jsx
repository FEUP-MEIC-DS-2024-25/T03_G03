'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, Plus, Share, Pencil, Archive, Trash } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import InfiniteScroll from 'react-infinite-scroll-component'

export default function VerticalSidePanel({ user, isCollapsed, toggleCollapse }) {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, index) => index + 1))
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = () => {
    setTimeout(() => {
      if (data.length >= 100) {
        setHasMore(false)
        return
      }
      const newData = Array.from({ length: 20 }, (_, index) => data.length + index + 1)
      setData(prevData => [...prevData, ...newData])
    }, 500)
  }

  return (
    <div className="relative h-full">
      <div
        className={`
          flex flex-col h-full bg-background text-foreground transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'}
        `}
      >
        {!isCollapsed && (
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold truncate">Speech2Req</h1>
            <div className='relative group'>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className="shrink-0"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
                  <div className="bg-popover text-popover-foreground rounded-md shadow-md p-2 text-sm flex items-center space-x-2 whitespace-nowrap">
                      <span>Close sidebar</span>
                  </div>
                  <div className="absolute left-4 -top-2 w-3 h-3 bg-popover rotate-45 transform origin-center"></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col h-[calc(100%-4rem)]">
          <div className="p-4">
            <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-2 px-4 flex-grow overflow-hidden">
            <p className="font-semibold">Previous Chats</p>
            <div id="scrollableMenu" className="overflow-y-auto flex-grow">
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p className="text-center py-2">Loading...</p>}
                endMessage={
                  <p className="text-center py-2">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                scrollableTarget="scrollableMenu"
                height="calc(100vh - 12rem)"
              >
                {data.map((item) => (
                  <ContextMenu key={item}>
                    <ContextMenuTrigger>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="truncate">Chat {item}</span>
                      </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <span className='flex flex-row space-x-2 items-center'>
                          <Share size={16} />
                          <p>Share</p>
                        </span>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <span className='flex flex-row space-x-2 items-center'>
                          <Pencil size={16} />
                          <p>Rename</p>
                        </span>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <span className='flex flex-row space-x-2 items-center'>
                          <Archive size={16} />
                          <p>Archive</p>
                        </span>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <span className='flex flex-row space-x-2 items-cente text-red-500'>
                          <Trash size={16} />
                          <p>Delete</p>
                        </span>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </InfiniteScroll>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
