import React from 'react';

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <h1 className="text-4xl font-poppins font-semibold text-gray-800">{title}</h1>
    );
};

export default PageTitle;