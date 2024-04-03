import React from 'react';
import Root from './Root';
import Text from './Text';
import ActionRow from './ActionRow';


const Form = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Form.Root = Root;
Form.Text = Text;
Form.ActionRow = ActionRow


export default Form;