'use client'
import React, { useEffect, useState } from 'react';
import { InterimNote, InterimSnapshotWarnings } from './MainPanel';
import { completeNewRequest } from '../_functions/completeNewRequest';
import { useRouter } from 'next/navigation';

type CompleteStepProps = {
    currentStep: number;
    item: string;
    notes: InterimNote[];
    snapshotWarnings: InterimSnapshotWarnings;
};

const CompleteStep = ({ currentStep, item, notes, snapshotWarnings }: CompleteStepProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (currentStep === 3) {
            setIsComplete(true);
        }

    }, [currentStep]);

    useEffect(() => {

        if (!isComplete) {
            return;
        }

        const complete = async () => {
            setIsLoading(true);
            try {
                const complete = await completeNewRequest(item, notes, snapshotWarnings);
            } catch (error) {
                throw new Error('Something went wrong in completion' );
            } finally {
                setIsLoading(false);
                router.back();
            }
        };

        complete();
    }, [isComplete, item, notes, router, snapshotWarnings]);

    if (currentStep !== 3) {
        return null;
    }

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='font-poppins font-bold text-2xl text-neutral-900 flex items-end justify-center'>
                Waiting
                <span className="loading loading-dots loading-xs"></span>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        </div>
    );
};

export default CompleteStep;
