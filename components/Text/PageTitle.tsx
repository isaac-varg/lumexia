import React from 'react';

const PageTitle: React.FC<{ title?: string, children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <h1 className="text-4xl font-poppins font-semibold text-base-content">{title || children}</h1>
  );
};

export default PageTitle;
