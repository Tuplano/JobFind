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
    about: string;
  };
  professionalInfo: {
    title: string;
    experience: string;
    company: string;
    skills: string;
  }[];
  educationInfo: {
    degree: string;
    school: string;
    graduationYear: string;
    gpa: string;
  };
  resume: File | null;
}
