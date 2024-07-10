"use client";
import { ToastContext } from "@/context/ToastContext";
import useToast from "@/hooks/useToast";
import * as Toast from "@radix-ui/react-toast";
import { useContext, useEffect } from "react";

export const toastClasses = {
  shape:
    "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
  base: "rounded-md  p-[15px]  items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
  color: {
    default: "bg-white text-neutral-700",
    success: "bg-bay-leaf-100 text-bay-leaf-700 ",
  },
};

const ToastRoot = () => {
  const { isToastOpen, title, description, color } = useContext(ToastContext);
  const { stopToast } = useToast();

  useEffect(() => {
    let timer: any;
    if (isToastOpen) {
      timer = setTimeout(() => {
        stopToast();
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [isToastOpen, stopToast]);
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={isToastOpen}
        className={`${toastClasses.base} ${toastClasses.shape} ${toastClasses.color[color]}`}
      >
        <Toast.Title className="font-poppins text-lg font-medium">
          {title}
        </Toast.Title>
        <Toast.Description className="font-poppins text-lg">
          {description}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastRoot;
