"use client"
import ContextMenu from '@/components/ContextMenu'
import Link from 'next/link'
import React from 'react'

const TextContext = () => {
    const handleclickly = (event: Event) => {
        window.open("/?id=123", '_blank', 'noopener,noreferrer')
    }
  return (
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            
        <div>hellllo</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
           {/* <Link rel="noopener noreferrer" target="_blank" href={"/"}> <ContextMenu.Item onClick={handleclickly} shortcut={"CTRL + A"}>asd</ContextMenu.Item></Link> */}
           <ContextMenu.Item onClick={handleclickly}  shortcut={"CTRL + A"}>New Tab</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default TextContext