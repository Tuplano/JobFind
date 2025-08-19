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
    },
    professionalInfo: {
      title: "",
      experience: "",
      education: "",
      skills: "",
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
      const selectedCountry = COUNTRY_OPTIONS.find(
        (c) => c.value === value
      );
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
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      professionalInfo: { ...prev.professionalInfo, [name]: value },
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
            formData.personalInfo.dateOfBirth &&
            formData.personalInfo.dateOfBirth
        );
      case 2:
        return Boolean(
          formData.professionalInfo.title &&
            formData.professionalInfo.experience &&
            formData.professionalInfo.skills
        );
      case 3:
        return Boolean(formData.resume);
      default:
        return false;
    }
  };

  const getCompletedSteps = (): number[] =>
    STEPS.map((step) => step.id).filter(validateStep);

  const nextStep = () => {
    if (currentStep < STEPS.length && validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting Employee data:", formData);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Employee profile created successfully!");
  };

  const completedSteps = getCompletedSteps();
  const canProceed = validateStep(currentStep);
  const isLastStep = currentStep === STEPS.length;
  const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
    User,
    Briefcase,
    Upload,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your profile to start applying for jobs and showcase your
            skills to potential employers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Indicators */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Overall Progress
                  </span>
                  <span className="text-sm font-semibold text-blue-900">
                    {Math.round((completedSteps.length / STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={handlePersonalChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

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
              </FormStep>
            )}

            {currentStep === 2 && (
              <FormStep title="Step 2: Professional Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Job Title"
                    name="title"
                    value={formData.professionalInfo.title}
                    onChange={handleProfessionalChange}
                    required
                  />
                  <SelectField
                    label="Experience"
                    name="experience"
                    value={formData.professionalInfo.experience}
                    onChange={handleProfessionalChange}
                    options={EXPERIENCE_OPTIONS}
                    required
                  />
                  <InputField
                    label="Education"
                    name="education"
                    value={formData.professionalInfo.education}
                    onChange={handleProfessionalChange}
                  />
                  <TextAreaField
                    label="Skills"
                    name="skills"
                    value={formData.professionalInfo.skills}
                    onChange={handleProfessionalChange}
                    required
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 3 && (
              <FormStep title="Step 3: Resume Upload">
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
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <span className="text-sm text-gray-500">
                Step {currentStep} of {STEPS.length}
              </span>

              {!isLastStep ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition duration-200 min-w-[140px] justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
