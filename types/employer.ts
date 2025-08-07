export interface CompanyInfo {
  companyName: string;
  industry: string;
  companySize: string;
  foundedYear: string;
  description: string;
}

export interface ContactInfo {
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface EmployerSetupData {
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  logo: File | null;
}

export interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
}

export interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

export interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}