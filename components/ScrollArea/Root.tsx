import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

type ScrollAreaProps = {
  children: React.ReactNode;
}


const Root = ({ children }: ScrollAreaProps) => (
  <ScrollArea.Root className="w-full h-full rounded overflow-hidden">
    <ScrollArea.Viewport className="w-full h-full">
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex w-full select-none touch-none bg-gray-700 transition-colors duration-[160ms] ease-out hover:bg-gray-500"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-full" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);


export default Root;
