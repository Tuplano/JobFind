import React from "react";
import { InputFieldProps } from "@/types/all";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  pattern,
  required = false,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      pattern={pattern}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#76944C] focus:border-transparent transition duration-200"
    />
  </div>
);

export default InputField;
