import React from 'react';
import Root from './Root';
import Title from './Title';

const Card = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Card.Root = Root;
Card.Title = Title;

export default Card;
