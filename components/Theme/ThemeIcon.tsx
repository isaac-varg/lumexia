'use client'

import useDialog from "@/hooks/useDialog"

const ThemeIcon = () => {

  const { showDialog } = useDialog();
  const handleClick = () => {
    showDialog('themeChanger')
  }


  return (
    <div className="bg-base-200 hover:bg-accent/40 rounded-xl px-2 py-2"
      onClick={() => handleClick()}
    >
      <div className="bg-base-100 hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
        <div className="bg-base-content size-2 rounded-full"></div>
        <div className="bg-primary size-2 rounded-full"></div>
        <div className="bg-secondary size-2 rounded-full"></div>
        <div className="bg-accent size-2 rounded-full"></div>
      </div>
    </div>

  )
}

export default ThemeIcon
