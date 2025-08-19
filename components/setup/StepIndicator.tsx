import { Check } from 'lucide-react';
import { StepIndicatorProps } from '@/types/all';
function StepIndicator({ title, description, icon, isCompleted, isActive }: StepIndicatorProps) {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-white border-2 border-gray-200'
      }`}
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isActive
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        {isCompleted ? <Check size={24} /> : icon}
      </div>
      <div className="flex-grow">
        <h3
          className={`font-semibold ${
            isActive ? 'text-[#76944C]' : 'text-gray-700'
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default StepIndicator;
