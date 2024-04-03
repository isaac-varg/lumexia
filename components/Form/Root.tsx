"use client"
import React from 'react';
import { useForm } from 'react-hook-form';

type RootProps = {
    children: React.ReactNode;
    inputs: {}
};

const Root = ({ children }: RootProps) => {


    const { handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 rounded-lg border-2 border-cutty-sark-200">
                {children}
            </div>
        </form>
    );
};

export default Root;