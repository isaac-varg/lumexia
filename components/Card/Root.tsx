import React from 'react';

const Root = ({ children }: { children: React.ReactNode }) => (
    <div className="p-6 rounded-lg border-2 border-cutty-sark-200">{children}</div>
);

export default Root;