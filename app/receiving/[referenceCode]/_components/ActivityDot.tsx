import React from 'react'

const ActivityDot = ({index} : {index: number}) => {
	
	const bgColor  = index % 2 === 0 ? 'bg-tasman-500' :'bg-limed-spruce-500' 
	

  return (
    <div className={`${bgColor} h-4 w-4 rounded-full p-2`} />
  )
}

export default ActivityDot
