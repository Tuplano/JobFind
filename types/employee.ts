export interface EmployeeSetupData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    dateOfBirth: string;
    linkedin: string;
    portfolio: string;
  };
  professionalInfo: {
    title: string;
    experience: string;
    education: string;
    skills: string;
  };
  resume: File | null;
}
