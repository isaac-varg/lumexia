import React from 'react';
import Root from './Root';
import Title from './Title';
import Row from './Row';

const Card = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Card.Root = Root;
Card.Title = Title;
Card.Row = Row;

export default Card;