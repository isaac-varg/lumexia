import React from 'react';
import Root from './Root';
import Text from './Text';



const Form = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Form.Root = Root;
Form.Text = Text;


export default Form;