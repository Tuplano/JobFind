export interface InputFieldProps {  
  label: string;
  name: string;
  type?: string;
  value: string;
onChange: (e: React.ChangeEvent<any>) => void;  placeholder?: string;
  pattern?: string;
  required?: boolean;

}

export  interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
onChange: (e: React.ChangeEvent<any>) => void;  placeholder?: string;
  rows?: number;     
  required?: boolean; 
}

export interface Option {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
}

export interface StepIndicatorProps  {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
}