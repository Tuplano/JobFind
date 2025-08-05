"use client"
import React, { createElement, useState, ChangeEvent } from 'react';
import { Camera, MapPin, Globe, Users, Building, Phone, Mail, Upload, X } from 'lucide-react';

import {
  EmployerFormData,
  IndustryType,
  CompanySize,
  CompanyType,
  InputFieldProps,
}  from '@/types/employer';



const EmployerSetup: React.FC = () => {
  const [formData, setFormData] = useState<EmployerFormData>({
    // Company Basic Info
    companyName: '',
    companyTagline: '',
    companyDescription: '',
    industryType: '',
    companySize: '',
    foundedYear: '',
    companyType: '',
    
    // Contact Information
    website: '',
    email: '',
    phone: '',
    
    // Location Details
    headquarters: '',
    country: '',
    state: '',
    city: '',
    
    // Social Media & Online Presence
    linkedinUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    
    // Legal & Verification
    registrationNumber: '',
    taxId: '',
    
    // Additional Info
    benefits: [],
    workCulture: '',
    mission: '',
    vision: ''
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [newBenefit, setNewBenefit] = useState<string>('');

  const industryTypes: readonly IndustryType[] = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Media & Entertainment', 'Real Estate',
    'Transportation', 'Energy', 'Agriculture', 'Government', 'Non-Profit', 'Other'
  ] as const;

  const companySizes: readonly CompanySize[] = [
    '1-10 employees', '11-50 employees', '51-200 employees',
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ] as const;

  const companyTypes: readonly CompanyType[] = [
    'Private Company', 'Public Company', 'Startup', 'Non-Profit',
    'Government Agency', 'Educational Institution', 'Partnership', 'Sole Proprietorship'
  ] as const;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setLogoPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addBenefit = (): void => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string): void => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
  };

  const nextStep = (): void => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = (): void => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (): void => {
    console.log('Employer Profile Data:', formData);
    // Handle form submission here - integrate with your API
    alert('Employer profile setup completed!');
  };

const renderStepIndicator = (): React.ReactElement => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    required = false,
    icon,
    isTextarea = false,
    rows = 4,
    options,
    min,
    max
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-2.5 w-5 h-5 text-gray-400">
            {icon}
          </div>
        )}
        
        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
          />
        )}
      </div>
    </div>
  );

  const renderStep1 = (): React.ReactElement => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Information</h2>
      
      {/* Logo Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {logoPreview ? (
            <img src={logoPreview} alt="Company Logo" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
          </label>
        </div>
        <p className="text-sm text-gray-600">Upload Company Logo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter company name"
          required
        />

        <InputField
          label="Company Tagline"
          name="companyTagline"
          value={formData.companyTagline}
          onChange={handleInputChange}
          placeholder="Brief tagline about your company"
        />

        <InputField
          label="Industry Type"
          name="industryType"
          value={formData.industryType}
          onChange={handleInputChange}
          options={industryTypes}
          required
        />

        <InputField
          label="Company Size"
          name="companySize"
          value={formData.companySize}
          onChange={handleInputChange}
          options={companySizes}
          required
        />

        <InputField
          label="Founded Year"
          name="foundedYear"
          value={formData.foundedYear}
          onChange={handleInputChange}
          type="number"
          placeholder="2020"
          min="1800"
          max="2024"
        />

        <InputField
          label="Company Type"
          name="companyType"
          value={formData.companyType}
          onChange={handleInputChange}
          options={companyTypes}
        />
      </div>

      <InputField
        label="Company Description"
        name="companyDescription"
        value={formData.companyDescription}
        onChange={handleInputChange}
        placeholder="Describe your company, what you do, and what makes you unique..."
        isTextarea
        required
      />
    </div>
  );

  const renderStep2 = (): React.ReactElement => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Location</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Website URL"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          type="url"
          placeholder="https://company.com"
          icon={<Globe className="w-5 h-5" />}
        />

        <InputField
          label="Company Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="contact@company.com"
          icon={<Mail className="w-5 h-5" />}
          required
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          type="tel"
          placeholder="+1 (555) 123-4567"
          icon={<Phone className="w-5 h-5" />}
        />

        <InputField
          label="Headquarters Address"
          name="headquarters"
          value={formData.headquarters}
          onChange={handleInputChange}
          placeholder="123 Business St, Suite 100"
          icon={<MapPin className="w-5 h-5" />}
          required
        />

        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="United States"
          required
        />

        <InputField
          label="State/Province"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="California"
        />

        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="San Francisco"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="LinkedIn URL"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleInputChange}
          type="url"
          placeholder="https://linkedin.com/company/yourcompany"
        />

        <InputField
          label="Twitter URL"
          name="twitterUrl"
          value={formData.twitterUrl}
          onChange={handleInputChange}
          type="url"
          placeholder="https://twitter.com/yourcompany"
        />
      </div>
    </div>
  );

  const renderStep3 = (): React.ReactElement => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Legal & Verification</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Business Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleInputChange}
          placeholder="123456789"
        />

        <InputField
          label="Tax ID / EIN"
          name="taxId"
          value={formData.taxId}
          onChange={handleInputChange}
          placeholder="12-3456789"
        />
      </div>

      <InputField
        label="Company Mission"
        name="mission"
        value={formData.mission}
        onChange={handleInputChange}
        placeholder="What is your company's mission statement?"
        isTextarea
        rows={3}
      />

      <InputField
        label="Company Vision"
        name="vision"
        value={formData.vision}
        onChange={handleInputChange}
        placeholder="What is your company's vision for the future?"
        isTextarea
        rows={3}
      />

      <InputField
        label="Work Culture"
        name="workCulture"
        value={formData.workCulture}
        onChange={handleInputChange}
        placeholder="Describe your company's work culture, values, and what makes it a great place to work..."
        isTextarea
        rows={4}
      />
    </div>
  );

  const renderStep4 = (): React.ReactElement => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits & Perks</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Employee Benefits</label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newBenefit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewBenefit(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add a benefit (e.g., Health Insurance, Flexible Hours)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
          />
          <button
            type="button"
            onClick={addBenefit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {formData.benefits.map((benefit: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {benefit}
              <button
                type="button"
                onClick={() => removeBenefit(benefit)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        {formData.benefits.length === 0 && (
          <p className="text-gray-500 text-sm mt-2">No benefits added yet. Add some perks that make your company attractive to job seekers.</p>
        )}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Profile Summary</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Company:</span> {formData.companyName || 'Not specified'}</p>
          <p><span className="font-medium">Industry:</span> {formData.industryType || 'Not specified'}</p>
          <p><span className="font-medium">Size:</span> {formData.companySize || 'Not specified'}</p>
          <p><span className="font-medium">Location:</span> {formData.city ? `${formData.city}, ${formData.country}` : 'Not specified'}</p>
          <p><span className="font-medium">Benefits:</span> {formData.benefits.length} benefits added</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Setup Your Employer Profile</h1>
            <p className="text-gray-600 mt-2">Complete your company profile to start posting jobs and attracting top talent</p>
          </div>

          {renderStepIndicator()}

          <div>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSetup;