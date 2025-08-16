export interface  EmployeeSetupData  {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  professionalInfo: {
    title: string;
    experience: string;
    education: string;
    skills: string;
  };
  resume: File | null;
};
