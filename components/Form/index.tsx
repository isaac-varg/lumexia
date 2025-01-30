import React from 'react';
import Root from './Root';
import Text from './Text';
import ActionRow from './ActionRow';
import SelectField from './Select';
import Number from './Number';
import TextArea from './TextArea';
import ToggleField from './Toggle';
import ColorField from './Color';
import TagSelectField from './TagSelect';


const Form = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Form.Root = Root;
Form.Text = Text;
Form.ActionRow = ActionRow
Form.Select = SelectField
Form.TagSelect = TagSelectField 
Form.Number = Number
Form.Color = ColorField
Form.TextArea = TextArea
Form.Toggle = ToggleField


export default Form;
