"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Building2,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import UserTypeCard from "@/components/signup-page/UserTypeCard";
import InputField from "@/components/ui/InputField";
import { LoginData, SignupData } from "@/types/Signup";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    userType: "employee",
  });

  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employee",
    companyName: "",
    termsAccepted: false,
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateLogin = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!signupData.firstName) newErrors.firstName = "First name is required";
    if (!signupData.lastName) newErrors.lastName = "Last name is required";

    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (signupData.userType === "employer" && !signupData.companyName) {
      newErrors.companyName = "Company name is required for employers";
    }

    if (!signupData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Login attempt:", loginData);
    setIsLoading(false);

    // Redirect based on user type
    if (loginData.userType === "employer") {
      console.log("Redirecting to employer dashboard");
    } else {
      console.log("Redirecting to job search");
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Signup attempt:", signupData);
    setIsLoading(false);

    // Redirect to appropriate onboarding
    if (signupData.userType === "employer") {
      console.log("Redirecting to employer setup");
    } else {
      console.log("Redirecting to profile setup");
    }
  };

  const userTypeOptions = {
    employee: {
      title: "Job Seeker",
      description: "Looking for opportunities",
      benefits: [
        "Browse thousands of jobs",
        "Apply with one click",
        "Get matched with employers",
        "Track applications",
      ],
    },
    employer: {
      title: "Employer",
      description: "Hiring top talent",
      benefits: [
        "Post unlimited jobs",
        "Access candidate database",
        "Advanced filtering tools",
        "Analytics dashboard",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Join Our Platform"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin
              ? "Sign in to your account to continue"
              : "Create your account and start your journey"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              isLogin
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              !isLogin
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 text-center">
            I am a...
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(userTypeOptions).map(([type, config]) => (
              <UserTypeCard
                key={type}
                type={type as "employer" | "employee"}
                title={config.title}
                description={config.description}
                icon={
                  type === "employer" ? (
                    <Building2 size={24} />
                  ) : (
                    <User size={24} />
                  )
                }
                benefits={config.benefits}
                isSelected={
                  isLogin
                    ? loginData.userType === type
                    : signupData.userType === type
                }
                onSelect={() => {
                  if (isLogin) {
                    setLoginData((prev) => ({
                      ...prev,
                      userType: type as "employer" | "employee",
                    }));
                  } else {
                    setSignupData((prev) => ({
                      ...prev,
                      userType: type as "employer" | "employee",
                    }));
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Forms */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          {isLogin ? (
            /* Login Form */
            <div className="space-y-6">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition duration-200 space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Signup Form */
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  placeholder="John"
                  required
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  placeholder="Doe"
                  required
                />
              </div>

              {signupData.userType === "employer" && (
                <InputField
                  label="Company Name"
                  name="companyName"
                  value={signupData.companyName || ""}
                  onChange={handleSignupChange}
                  placeholder="Your Company Inc."
                  required
                />
              )}

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="john@example.com"
                required
              />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={signupData.termsAccepted}
                  onChange={handleSignupChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <button className="text-blue-600 hover:text-blue-800 underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">{errors.termsAccepted}</p>
              )}

              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition duration-200 space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Social Login Options */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
