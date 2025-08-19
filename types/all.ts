export interface InputFieldProps {  
  label: string;
  name: string;
  type?: string;
  value: string;
onChange: (e: React.ChangeEvent<any>) => void;  placeholder?: string;
  pattern?: string;
  required?: boolean;

}
