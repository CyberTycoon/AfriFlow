"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import languages from "@/app/data/languages.json"
import Select from "react-select"

interface Language {
  name: string
}

type FormDataType = {
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
  accountType: string
  fullName: string
  phoneNumber: string
  country: string
  state: string
  preferredLanguage: string
  businessName: string
  industry: string
  pin: string
  useVoice: boolean
  useBiometric: boolean
}

interface Props {
  formData: {
    preferredLanguage: string
    // Other form fields can be included if needed
    [key: string]: string | boolean | number // Specify the possible types for formData properties
  }
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>> // Accept the React state setter
}

const LanguageSelector = ({ formData, setFormData }: Props) => {
  // Assuming languages is an array of { name, code } objects
  const [selected, setSelected] = useState<Language | null>(
    languages.find((l) => l.name === formData.preferredLanguage) || null,
  )

  useEffect(() => {
    if (selected) {
      // Use the functional update pattern with the state setter
      setFormData((prevFormData) => ({
        ...prevFormData,
        preferredLanguage: selected.name,
      }))
    }
  }, [selected, setFormData])

  return (
    <div className="flex justify-between items-center">
      <div className="w-[50%]">
        <label className="w-full block mb-2 text-amber-100">🌐 Preferred Language:</label>
      </div>
      <div className="w-[50%]">
        <Select
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#111827", // bg-gray-900
              borderColor: "rgba(245, 158, 11, 0.2)", // amber-500/20
              color: "#FBBF24", // amber-100
              boxShadow: "none",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#111827", // bg-gray-900
              color: "#FBBF24", // amber-100
              boxShadow: "none",
              backdropFilter: "none",
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isFocused || isSelected ? "#D97706" : "#111827", // amber-600 or bg-gray-900
              color: isFocused || isSelected ? "#ffffff" : "#FBBF24",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#FBBF24",
            }),
            placeholder: (base) => ({
              ...base,
              color: "rgba(251, 191, 36, 0.6)", // amber-100/60
            }),
            input: (base) => ({
              ...base,
              color: "#FBBF24",
            }),
          }}
          blurInputOnSelect={true}
          closeMenuOnSelect={true}
          options={languages}
          value={selected}
          onChange={(newValue) => setSelected(newValue as Language)}
          placeholder="Select language"
          isSearchable
          getOptionLabel={(option: Language) => option.name}
          getOptionValue={(option: Language) => option.name}
        />
      </div>
    </div>
  )
}

export default function Signup() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    accountType: "Individual",
    fullName: "",
    phoneNumber: "",
    country: "Nigeria",
    state: "Lagos",
    preferredLanguage: "English",
    businessName: "",
    industry: "Agriculture",
    pin: "",
    useVoice: false,
    useBiometric: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [animationClass, setAnimationClass] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const nextStep = () => {
    // Form validation for first step
    if (currentStep === 1) {
      if (!formData.email) {
        setErrorMessage("Email is required")
        return
      }
      if (!formData.password) {
        setErrorMessage("Password is required")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match")
        return
      }
      if (!formData.agreeTerms) {
        setErrorMessage("You must agree to the terms")
        return
      }
    }

    // Form validation for second step
    if (currentStep === 2) {
      if (!formData.fullName) {
        setErrorMessage("Full name is required")
        return
      }
      if (!formData.phoneNumber) {
        setErrorMessage("Phone number is required")
        return
      }
      if (formData.accountType === "Business" && !formData.businessName) {
        setErrorMessage("Business name is required")
        return
      }
    }

    setErrorMessage(null)
    setAnimationClass("slide-out")

    setTimeout(() => {
      setCurrentStep(currentStep + 1)
      setAnimationClass("slide-in")
    }, 500)
  }

  const createAccount = async () => {
    if (!formData.pin || formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
      setErrorMessage("Please enter a valid 4-digit numeric PIN")
      return
    }

    setErrorMessage(null)
    setIsLoading(true)

    try {
      const apiData = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        country: formData.country,
        state_province: formData.state,
        preferred_language: formData.preferredLanguage,
        language: formData.preferredLanguage,
        business_type: formData.accountType.toLowerCase(),
        business_name: formData.accountType === "Business" ? formData.businessName : "",
        industry: formData.accountType === "Business" ? formData.industry : "",
        pin: formData.pin,
        voice_mode: formData.useVoice,
        enable_biometrics_login: formData.useBiometric,
      }

      console.log("📤 [Frontend] Sending to /api/register:", apiData)

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      const data = await response.json()

      console.log("📥 [Frontend] Received response:", data)

      if (!response.ok) {
        let errorMsg = "Registration failed. Please try again."
        if (data) {
          if (typeof data === "string") errorMsg = data
          else if (data.detail) errorMsg = data.detail
          else if (data.message) errorMsg = data.message
          else {
            const errors = Object.entries(data)
              .flatMap(([key, value]) =>
                Array.isArray(value) ? value.map((err) => `${key}: ${err}`) : [`${key}: ${value}`],
              )
              .join(", ")
            if (errors) errorMsg = errors
          }
        }
        throw new Error(errorMsg)
      }

      setAnimationClass("success-animation")

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("❌ [Frontend] Registration error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Registration failed. Please try again.")
    } finally {
      console.log("✅ [Frontend] Final form state:", formData)
      setIsLoading(false)
    }
  }

  // Get the appropriate video source based on the current step
  const getVideoSource = () => {
    return `/videos/signup-step-${currentStep}.mp4`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center lg:px-30 pt-10 mt-10">
      {/* African-inspired background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Colored orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500 opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500 opacity-20 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-orange-500 opacity-20 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>


    

        {/* Form Column - Right Side */}
        <div className="w-full md:w-1/2">
          {/* Error display */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form container with animation */}
          <div
            className={`bg-gray-800/80 rounded-r-2xl p-6 px-25 shadow-xl border-r border-t border-b border-amber-500/20 transition-all duration-500 ${animationClass} relative overflow-hidden h-full`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

            {/* Step indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        step < currentStep
                          ? "bg-amber-500"
                          : step === currentStep
                            ? "bg-gradient-to-r from-amber-500 to-orange-600"
                            : "bg-gray-700"
                      }`}
                    >
                      {step < currentStep ? (
                        <svg
                          className="w-4 h-4 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm">{step}</span>
                      )}
                    </div>
                    {step < 3 && <div className={`w-12 h-1 ${step < currentStep ? "bg-amber-500" : "bg-gray-700"}`} />}
                  </div>
                ))}
              </div>
            </div>

            {currentStep === 1 && (
              <div className="space-y-6 relative z-10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-amber-400">👋 Welcome to AfriFlow!</h2>
                  <p className="text-amber-100/60">Start trading, sending money, and getting export help.</p>
                </div>

                <LanguageSelector formData={formData} setFormData={setFormData} />

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-amber-100">📧 Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-100">🔒 Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="********"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-100">🔒 Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="********"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 bg-gray-700 border-amber-500/20 rounded focus:ring-amber-500 text-amber-500"
                      required
                    />
                    <label htmlFor="agreeTerms" className="ml-2 text-sm text-amber-100/60">
                      I agree to the{" "}
                      <Link
                        href="#"
                        className="text-amber-400/80 hover:text-amber-400 hover:underline transition-colors"
                      >
                        Terms & Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-100">I&apos;m a:</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accountType"
                          value="Individual"
                          checked={formData.accountType === "Individual"}
                          onChange={handleChange}
                          className="w-4 h-4 bg-gray-700 border-amber-500/20 focus:ring-amber-500 text-amber-500"
                        />
                        <span className="ml-2 text-amber-100">Individual</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accountType"
                          value="Business"
                          checked={formData.accountType === "Business"}
                          onChange={handleChange}
                          className="w-4 h-4 bg-gray-700 border-amber-500/20 focus:ring-amber-500 text-amber-500"
                        />
                        <span className="ml-2 text-amber-100">Business</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
                >
                  Continue <span className="ml-2">➜</span>
                </button>

                <div className="text-center mt-4 text-sm text-amber-100/60">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-amber-400/80 hover:text-amber-400 hover:underline transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 relative z-10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-amber-400">Personal Information</h2>
                  <p className="text-amber-100/60">Tell us a bit about yourself</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-amber-100">📛 Full Name:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-100">📱 Phone Number:</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="+234 ___ ___ ____"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-amber-100">🌍 Country:</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      >
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Tanzania">Tanzania</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-amber-100">🏙️ State/Province:</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Kano">Kano</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                      </select>
                    </div>
                </div>
                
                <div>
                    <label className="block mb-2 text-amber-100">📱 Phone Number:</label>
                    <input
                      type="text"
                      name=""
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="+234 ___ ___ ____"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-amber-100">🌐 Preferred Language:</label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                    >
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Swahili">Swahili</option>
                      <option value="Yoruba">Yoruba</option>
                      <option value="Hausa">Hausa</option>
                      <option value="Amharic">Amharic</option>
                      <option value="Zulu">Zulu</option>
                      <option value="Igbo">Igbo</option>
                    </select>
                  </div>

                  {formData.accountType === "Business" && (
                    <>
                      <div>
                        <label className="block mb-2 text-amber-100">🏢 Business Name:</label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                          placeholder="Your Business Name"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-amber-100">🛠️ Industry:</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                        >
                          <option value="Agriculture">Agriculture</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Technology">Technology</option>
                          <option value="Retail">Retail</option>
                          <option value="Services">Services</option>
                          <option value="Textiles">Textiles</option>
                          <option value="Mining">Mining</option>
                          <option value="Energy">Energy</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
                >
                  Continue <span className="ml-2">➜</span>
                </button>

                <button
                  onClick={() => {
                    setAnimationClass("slide-out")
                    setTimeout(() => {
                      setCurrentStep(currentStep - 1)
                      setAnimationClass("slide-in")
                    }, 500)
                  }}
                  className="w-full mt-3 py-2 px-4 border border-amber-500/30 text-amber-400 font-medium rounded-lg hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">⬅</span> Go Back
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 relative z-10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-amber-400">Security Setup</h2>
                  <p className="text-amber-100/60">Set up your security preferences</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-amber-100">🔐 Setup PIN (for transactions):</label>
                    <input
                      type="text" // Change to text for better control
                      name="pin"
                      value={formData.pin}
                      onChange={(e) => {
                        // Only allow digits
                        const value = e.target.value.replace(/\D/g, "")
                        setFormData({
                          ...formData,
                          pin: value.substring(0, 4),
                        })
                      }}
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="****"
                      maxLength={4}
                      inputMode="numeric"
                      required
                    />
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 border border-amber-500/20">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="block font-medium text-amber-100">🗣️ Want to use voice?</span>
                        <span className="text-sm text-amber-100/60">Set a voice passphrase for transactions</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="useVoice"
                          checked={formData.useVoice}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-14 h-8 rounded-full transition ${
                            formData.useVoice ? "bg-amber-500" : "bg-gray-600"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                            formData.useVoice ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 border border-amber-500/20">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <span className="block font-medium text-amber-100">📲 Enable biometric login?</span>
                        <span className="text-sm text-amber-100/60">Use Face/Touch ID for faster login</span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="useBiometric"
                          checked={formData.useBiometric}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`block w-14 h-8 rounded-full transition ${
                            formData.useBiometric ? "bg-amber-500" : "bg-gray-600"
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                            formData.useBiometric ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => {
                    createAccount()
                  }}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      Create Account <span className="ml-2">✅</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAnimationClass("slide-out")
                    setTimeout(() => {
                      setCurrentStep(currentStep - 1)
                      setAnimationClass("slide-in")
                    }, 500)
                  }}
                  className="w-full mt-3 py-2 px-4 border border-amber-500/30 text-amber-400 font-medium rounded-lg hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">⬅</span> Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  
  )
}
