"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Upload,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { EmployerSetupData } from "@/types/employer";
import {
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
} from "@/Constants/Employer";

import StepIndicator from "@/components/employer-setup/StepIndicator";
import FormStep from "@/components/employer-setup/FormStep";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import LogoUpload from "@/components/employer-setup/LogoUpload";

import { toast } from "sonner";

const STEPS = [
  {
    id: 1,
    title: "Company Information",
    description: "Basic details about your company",
    icon: <Building2 size={24} />,
  },
  {
    id: 2,
    title: "Contact Details",
    description: "How candidates can reach you",
    icon: <MapPin size={24} />,
  },
  {
    id: 3,
    title: "Company Logo",
    description: "Upload your brand identity",
    icon: <Upload size={24} />,
  },
];

export default function EmployerSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EmployerSetupData>({
    companyInfo: {
      companyName: "",
      industry: "",
      companySize: "",
      foundedYear: "",
      description: "",
    },
    contactInfo: {
      website: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    },
    logo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompanyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyInfo: { ...prev.companyInfo, [name]: value },
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [name]: value },
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(
          formData.companyInfo.companyName &&
            formData.companyInfo.industry &&
            formData.companyInfo.companySize &&
            formData.companyInfo.foundedYear &&
            formData.companyInfo.description
        );
      case 2:
        return Boolean(
          formData.contactInfo.email &&
            formData.contactInfo.city &&
            formData.contactInfo.country
        );
      case 3:
        return Boolean(formData.logo);
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
    console.log("Submitting form data:", formData);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Company profile created successfully!");
  };

  const completedSteps = getCompletedSteps();
  const canProceed = validateStep(currentStep);
  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set Up Your Company Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your company profile to start posting jobs and finding the best talent for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Indicators */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Setup Progress
              </h2>
              {STEPS.map((step) => (
                <StepIndicator
                  key={step.id}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isCompleted={completedSteps.includes(step.id)}
                  isActive={currentStep === step.id}
                />
              ))}

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
              <FormStep title="Step 1: Company Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyInfo.companyName}
                    onChange={handleCompanyInfoChange}
                    required
                  />
                  <SelectField
                    label="Industry"
                    name="industry"
                    value={formData.companyInfo.industry}
                    onChange={handleCompanyInfoChange}
                    options={INDUSTRY_OPTIONS}
                    required
                  />
                  <SelectField
                    label="Company Size"
                    name="companySize"
                    value={formData.companyInfo.companySize}
                    onChange={handleCompanyInfoChange}
                    options={COMPANY_SIZE_OPTIONS}
                    required
                  />
                  <InputField
                    label="Founded Year"
                    name="foundedYear"
                    type="number"
                    value={formData.companyInfo.foundedYear}
                    onChange={handleCompanyInfoChange}
                    required
                  />
                </div>
                <div className="mt-6">
                  <TextAreaField
                    label="Company Description"
                    name="description"
                    value={formData.companyInfo.description}
                    onChange={handleCompanyInfoChange}
                    required
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 2 && (
              <FormStep title="Step 2: Contact Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Website"
                    name="website"
                    type="url"
                    value={formData.contactInfo.website}
                    onChange={handleContactInfoChange}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={handleContactInfoChange}
                    required
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={handleContactInfoChange}
                  />
                  <InputField
                    label="Country"
                    name="country"
                    value={formData.contactInfo.country}
                    onChange={handleContactInfoChange}
                    required
                  />
                  <InputField
                    label="City"
                    name="city"
                    value={formData.contactInfo.city}
                    onChange={handleContactInfoChange}
                    required
                  />
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.contactInfo.address}
                    onChange={handleContactInfoChange}
                  />
                </div>
              </FormStep>
            )}

            {currentStep === 3 && (
              <FormStep title="Step 3: Company Logo (Optional)">
                <LogoUpload logo={formData.logo} onChange={handleLogoUpload} />
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
