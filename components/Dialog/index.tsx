import React from 'react';
import Root from './Root';
import Title from './Title';



const Dialog = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Dialog.Root = Root;
Dialog.Title = Title;



export default Dialog;