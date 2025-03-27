import React, { Dispatch, SetStateAction, useState } from 'react'
import validator from 'validator'

// not sure how necessary this is but this is how i came up with allowing blanked out input and float/decimal values

type UFNumberProps = {
    placeholder: string
    onChangeOutput: Dispatch<SetStateAction<string>>
    input: string;
}

const UFNumber = ({ onChangeOutput, placeholder, input }: UFNumberProps) => {



    const handleChange = (value: string) => {
        const isNumber = validator.isFloat(value);

        if (value === "") {
            onChangeOutput("")
        }

        if (!isNumber) return;
        onChangeOutput((value))
    }

    return (
        <div className={`flex flex-col gap-y-2`}>
            <input
                type='text'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="px-4 py-4 border-2 border-neutral-100 bg-neutral-100 rounded-lg focus:outline-none focus:ring-0 focus:border-neutral-500 text-xl text-neutral-950"
                placeholder={placeholder}
            />
        </div>

    )
}

export default UFNumber
