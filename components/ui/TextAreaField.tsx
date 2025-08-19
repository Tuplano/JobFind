import React from 'react';
import { TextAreaFieldProps } from '@/types/all';

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: TextAreaFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76944C] focus:border-transparent transition duration-200 resize-vertical"
    />
  </div>
);

export default TextAreaField;
