import React, { Dispatch, SetStateAction } from 'react'

type Inputs = {
    name: string
    description: string
    bgColor: string
    textColor: string
}

const RequestNoteTypeForm = ({ setReqMode } : {setReqMode: Dispatch<SetStateAction<"show" | "add">>}) => {

  return (
    <div>RequestNoteTypeForm</div>
  )
}

export default RequestNoteTypeForm
