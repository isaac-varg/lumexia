"use client"
import ContextMenu from '@/components/ContextMenu'
import { openNewTab } from '@/utils/auxiliary/openNewTab'
import Link from 'next/link'
import React from 'react'

const TextContext = () => {
    const handleclickly = (event: Event) => {
        openNewTab('/')
    }
  return (
    <ContextMenu.Root>
        <ContextMenu.Trigger>
            
        <div>hellllo</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
           <ContextMenu.Item onClick={handleclickly}  shortcut={"CTRL + A"}>New Tab</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
  )
}

export default TextContext