"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Upload,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { toast } from "sonner";

import StepIndicator from "@/components/setup/StepIndicator";
import FormStep from "@/components/setup/FormStep";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import FileUpload from "@/components/setup/FileUpload";
import {
  EXPERIENCE_OPTIONS,
  STEPS,
  COUNTRY_OPTIONS,
  DEGREE_OPTIONS,
} from "@/Constants/Employee";

import { EmployeeSetupData } from "@/types/employee";

export default function EmployeeSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EmployeeSetupData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      dateOfBirth: "",
      linkedin: "",
      portfolio: "",
      about: "",
    },
    professionalInfo: [
      {
        title: "",
        experience: "",
        company: "",
        skills: "",
      },
    ],
    educationInfo: {
      degree: "",
      school: "",
      graduationYear: "",
      gpa: "",
    },
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handlePersonalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "country") {
        const selectedCountry = COUNTRY_OPTIONS.find((c) => c.value === value);
        const dialCode = selectedCountry?.dialCode || "";

        const currentPhone = prev.personalInfo.phone;
        const oldCountry = COUNTRY_OPTIONS.find(
          (c) => c.value === prev.personalInfo.country
        );
        const oldDialCode = oldCountry?.dialCode || "";

        let numberPart = currentPhone.startsWith(oldDialCode)
          ? currentPhone.slice(oldDialCode.length)
          : currentPhone;

        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            country: value,
            phone: dialCode + numberPart,
          },
        };
      }

      return {
        ...prev,
        personalInfo: { ...prev.personalInfo, [name]: value },
      };
    });
  };

  const handleProfessionalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedJobs = [...prev.professionalInfo];
      updatedJobs[index] = { ...updatedJobs[index], [name]: value };
      return { ...prev, professionalInfo: updatedJobs };
    });
  };
  const addJob = () => {
    setFormData((prev) => ({
      ...prev,
      professionalInfo: [
        ...prev.professionalInfo,
        { title: "", experience: "", company: "", skills: "" },
      ],
    }));
  };

  const removeJob = (index: number) => {
    setFormData((prev) => {
      const updatedJobs = prev.professionalInfo.filter((_, i) => i !== index);
      return { ...prev, professionalInfo: updatedJobs };
    });
  };

  const handleEducationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      educationInfo: { ...prev.educationInfo, [name]: value },
    }));
  };

  const handleResumeUpload = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(
          formData.personalInfo.fullName &&
            formData.personalInfo.email &&
            formData.personalInfo.city &&
            formData.personalInfo.country &&
            formData.personalInfo.dateOfBirth
        );

      case 2:
        // Completed if user entered something OR left the step
        return (
          visitedSteps.includes(2) ||
          formData.professionalInfo.some(
            (job) => job.title || job.experience || job.company || job.skills
          )
        );

      case 3:
        return (
          visitedSteps.includes(3) ||
          Boolean(
            formData.educationInfo.degree ||
              formData.educationInfo.school ||
              formData.educationInfo.graduationYear ||
              formData.educationInfo.gpa
          )
        );

      case 4:
        return Boolean(formData.resume);

      default:
        return false;
    }
  };

  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);

  const markStepVisited = (step: number) => {
    setVisitedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setVisitedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );

      if (canProceed) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getCompletedSteps = (): number[] =>
    STEPS.map((step) => step.id).filter((id) => validateStep(id));

  const handleSubmit = async () => {
    console.log("Submitting Employee data:", formData);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Employee profile created successfully!");
  };

  const completedSteps = getCompletedSteps();
  const canProceed = (() => {
    switch (currentStep) {
      case 1:
        return validateStep(1);
      case 2:
        return true;

      case 3:
        return true;
      case 4:
        return validateStep(4);
      default:
        return false;
    }
  })();
  const isLastStep = currentStep === STEPS.length;
  const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
    User,
    Briefcase,
    Upload,
    GraduationCap,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF5DB] via-[#C8DAA6]/20 to-[#FBF5DB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD21F] to-[#FFD21F]/80 rounded-2xl mb-6 shadow-xl">
            <User className="w-10 h-10 text-[#76944C]" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#76944C] to-[#76944C]/80 bg-clip-text text-transparent mb-4">
            Set Up Your Profile
          </h1>
          <p className="text-[#C0B6AC] max-w-2xl mx-auto text-lg">
            Complete your profile to start applying for jobs and showcase your
            skills to potential employers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Indicators */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <h2 className="text-xl font-bold text-[#76944C] mb-6">
                Setup Progress
              </h2>
              {STEPS.map((step) => {
                const IconComponent = ICONS[step.icon];
                return (
                  <StepIndicator
                    key={step.id}
                    title={step.title}
                    description={step.description}
                    icon={<IconComponent size={24} />}
                    isCompleted={completedSteps.includes(step.id)}
                    isActive={currentStep === step.id}
                  />
                );
              })}

              {/* Progress Bar */}
              <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-[#76944C]">
                    Overall Progress
                  </span>
                  <span className="text-lg font-bold text-[#76944C]">
                    {Math.round((completedSteps.length / STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#C8DAA6]/30 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FFD21F] to-[#FFD21F]/80 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{
                      width: `${(completedSteps.length / STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="lg:col-span-3">
            {currentStep === 1 && (
              <FormStep title="Step 1: Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={handlePersonalChange}
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={handlePersonalChange}
                    required
                  />

                  <InputField
                    label="City"
                    name="city"
                    value={formData.personalInfo.city}
                    onChange={handlePersonalChange}
                    placeholder="e.g. Manila"
                    required
                  />

                  <SelectField
                    label="Country"
                    name="country"
                    value={formData.personalInfo.country}
                    onChange={handlePersonalChange}
                    options={COUNTRY_OPTIONS}
                    required
                  />

                  <InputField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={handlePersonalChange}
                    required
                  />

                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={handlePersonalChange}
                    required
                  />
                  <InputField
                    label="LinkedIn"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.personalInfo.linkedin}
                    onChange={handlePersonalChange}
                  />
                  <InputField
                    label="Portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://myportfolio.com"
                    value={formData.personalInfo.portfolio}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="mt-6">
                  <TextAreaField
                    label="About You"
                    name="about"
                    value={formData.personalInfo.about}
                    onChange={handlePersonalChange}
                    placeholder="write a brief introduction about yourself..."
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 2 && (
              <FormStep title="Step 2: Professional Information">
                <div className="space-y-8">
                  {formData.professionalInfo.map((job, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-xl space-y-6 bg-white/70 shadow-sm"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Job Title"
                          name="title"
                          value={job.title}
                          onChange={(e) => handleProfessionalChange(e, index)}
                          placeholder="e.g. Software Developer"
                        />
                        <SelectField
                          label="Years of Experience"
                          name="experience"
                          value={job.experience}
                          onChange={(e) => handleProfessionalChange(e, index)}
                          options={EXPERIENCE_OPTIONS}
                        />
                      </div>

                      <InputField
                        label="Company"
                        name="company"
                        value={job.company}
                        onChange={(e) => handleProfessionalChange(e, index)}
                        placeholder="Company name"
                      />

                      <TextAreaField
                        label="Key Skills"
                        name="skills"
                        value={job.skills}
                        onChange={(e) => handleProfessionalChange(e, index)}
                        placeholder="List your key skills, technologies, and competencies..."
                      />

                      {/* Remove button (except for first job) */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeJob(index)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Remove this Job
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addJob}
                    className="mt-4 px-4 py-2 bg-[#76944C] text-white rounded-xl hover:shadow-md"
                  >
                    + Add Another Job
                  </button>
                </div>
              </FormStep>
            )}

            {currentStep === 3 && (
              <FormStep title="Step 3: Education Information">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                      label="Highest Degree"
                      name="degree"
                      value={formData.educationInfo.degree}
                      onChange={handleEducationChange}
                      options={DEGREE_OPTIONS}
                    />
                    <InputField
                      label="Graduation Year"
                      name="graduationYear"
                      type="number"
                      value={formData.educationInfo.graduationYear}
                      onChange={handleEducationChange}
                      placeholder="e.g. 2020"
                    />
                  </div>

                  <InputField
                    label="School/University"
                    name="school"
                    value={formData.educationInfo.school}
                    onChange={handleEducationChange}
                    placeholder="Institution name"
                  />

                  <InputField
                    label="GPA (Optional)"
                    name="gpa"
                    value={formData.educationInfo.gpa}
                    onChange={handleEducationChange}
                    placeholder="e.g. 3.5"
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 4 && (
              <FormStep title="Step 4: Resume Upload">
                <FileUpload
                  file={formData.resume}
                  onChange={handleResumeUpload}
                />
              </FormStep>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-[#76944C] rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-[#C8DAA6]/30 font-semibold"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <span className="text-sm text-[#C0B6AC] bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                Step {currentStep} of {STEPS.length}
              </span>

              {!isLastStep ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#76944C] to-[#76944C]/90 text-white rounded-2xl hover:shadow-xl disabled:from-[#C0B6AC] disabled:to-[#C0B6AC] disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed || isSubmitting}
                  className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-[#FFD21F] to-[#FFD21F]/80 text-[#76944C] rounded-2xl hover:shadow-xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105 min-w-[160px] justify-center font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#76944C]"></div>
                      <span>Setting up...</span>
                    </>
                  ) : (
                    <span>Complete Setup</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
