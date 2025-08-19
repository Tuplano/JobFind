import countries from "world-countries";

export const EXPERIENCE_OPTIONS = [
  { label: "0-1 years", value: "0-1" },
  { label: "1-3 years", value: "1-3" },
  { label: "3-5 years", value: "3-5" },
  { label: "5+ years", value: "5+" },
];
export const STEPS = [
  { id: 1, title: "Personal Info", description: "Basic details", icon: "User" },
  {
    id: 2,
    title: "Experience",
    description: "Work history",
    icon: "Briefcase",
  },
  {
    id: 3,
    title: "Education",
    description: "Academic background",
    icon: "GraduationCap",
  },
  { id: 4, title: "Resume", description: "Upload document", icon: "Upload" },
];

export const COUNTRY_OPTIONS = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  dialCode: country.idd?.root
    ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
    : "",
}));

export const DEGREE_OPTIONS = [
  { value: "high_school", label: "High School" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
  { value: "other", label: "Other" }
];

