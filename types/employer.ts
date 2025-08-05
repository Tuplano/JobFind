export interface EmployerFormData {
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  industryType: string;
  companySize: string;
  foundedYear: string;
  companyType: string;
  website: string;
  email: string;
  phone: string;
  headquarters: string;
  country: string;
  state: string;
  city: string;
  linkedinUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  registrationNumber: string;
  taxId: string;
  benefits: string[];
  workCulture: string;
  mission: string;
  vision: string;
}

export type IndustryType =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Education"
  | "Manufacturing"
  | "Retail"
  | "Consulting"
  | "Media & Entertainment"
  | "Real Estate"
  | "Transportation"
  | "Energy"
  | "Agriculture"
  | "Government"
  | "Non-Profit"
  | "Other";

export type CompanySize =
  | "1-10 employees"
  | "11-50 employees"
  | "51-200 employees"
  | "201-500 employees"
  | "501-1000 employees"
  | "1000+ employees";

export type CompanyType =
  | "Private Company"
  | "Public Company"
  | "Startup"
  | "Non-Profit"
  | "Government Agency"
  | "Educational Institution"
  | "Partnership"
  | "Sole Proprietorship";

  export interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  isTextarea?: boolean;
  rows?: number;
  options?: readonly string[];
  min?: string | number;
  max?: string | number;
}
