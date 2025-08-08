export interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
}

export interface TypeCardProps {
  type: "employer" | "employee";
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  isSelected: boolean;
  onSelect: () => void;
}

export interface LoginData {
  email: string;
  password: string;
  userType: "employer" | "employee";
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "employer" | "employee";
  companyName?: string;
  termsAccepted: boolean;
}
