"use client";
import React from "react";
import { UseFormReturn, useForm } from "react-hook-form";

type RootProps = {
  children: React.ReactNode;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

const Root = ({ children, form, onSubmit }: RootProps) => {



  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        {children}
      </div>
    </form>
  );
};

export default Root;
