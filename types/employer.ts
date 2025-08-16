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
