import React from 'react';

const FormStep: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    {children}
  </div>
);

export default FormStep;
