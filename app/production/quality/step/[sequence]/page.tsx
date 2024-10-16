import React from 'react'


type Props = {
    searchParams: {
        bprStepId: string;
    };
}

const StepQualityPage = ({ searchParams }: Props) => {

    const {bprStepId} = searchParams



    return (
        <div>{bprStepId}</div>
    )
}

export default StepQualityPage
