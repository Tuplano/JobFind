import React from "react";
import { SelectFieldProps } from "@/types/all";
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76944C] focus:border-transparent transition duration-200"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
