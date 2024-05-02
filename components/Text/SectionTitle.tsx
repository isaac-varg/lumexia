import React from 'react';

const SectionTitle = ({children } : { children: React.ReactNode }) => {
    return (
        <h1 className="text-3xl font-poppins font-semibold text-cararra-800">{children}</h1>
    );
};

export default SectionTitle;