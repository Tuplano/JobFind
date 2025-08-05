import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {[1, 2, 3, 4].map(step => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {step}
        </div>
        {step < 4 && (
          <div className={`w-16 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
