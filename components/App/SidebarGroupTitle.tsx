import React from 'react'

const SidebarGroupTitle = ({ children }: { children: React.ReactNode }) => {
        return (
                <div className='flex flex-row uppercase font-semibold font-poppins text-lg text-swirl-900'>{children}</div>
        )
}

export default SidebarGroupTitle
