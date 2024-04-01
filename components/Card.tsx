import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
);

Card.Root = ({ children }: { children: React.ReactNode }) => (
    <div className="p-6 rounded-lg border-2 border-cutty-sark-200">{children}</div>
);

Card.Title = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-poppins text-2xl font-semibold text-cutty-sark-950">{children}</h2>
);

export default Card;

