import React from 'react'

const SidebarGroupTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-row capitalize font-semibold tracking-wider font-poppins text-lg text-base-content' >{children}</div>
    )
}

export default SidebarGroupTitle
