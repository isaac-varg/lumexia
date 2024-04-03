import React from 'react';

const Row = ({ children }: { children: React.ReactNode }) => (  
    <div className="flex flex-row justify-between items-center">{children}</div>
);

export default Row;