"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage() {

  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
 


  const login = async () => {
    setErrorMessage(null);
    setIsLoading(true);
  
    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
  
      console.log("📤 [Frontend] Sending login request to /api/login:", loginData);
  
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      console.log("📥 [Frontend] Login response:", data);
  
      if (!response.ok) {
        let errorMsg = "Login failed. Please try again.";
        setIsLoading(false)
        if (data) {
          if (typeof data === "string") errorMsg = data;
          else if (data.detail) errorMsg = data.detail;
          else if (data.message) errorMsg = data.message;
          else {
            const errors = Object.entries(data)
              .flatMap(([key, value]) => (Array.isArray(value) ? value.map(err => `${key}: ${err}`) : [`${key}: ${value}`]))
              .join(", ");
            if (errors) errorMsg = errors;
          }
        }
        throw new Error(errorMsg);
      }
  
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
  
      setTimeout(() => {
        router.push("/dashboard");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false)
      console.error("❌ [Frontend] Login error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      console.log("✅ [Frontend] Final login state:", formData);
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gray-900 text-white py-10">
      {/* African-inspired background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Kente-inspired pattern */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/kente-pattern.svg')] bg-repeat opacity-5"></div>

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

      <div className="relative z-10 w-full max-w-md mx-auto pt-3 px-4 ">
                 {/* African proverb */}
        <div className="mt-8 text-center ">
          <p className="text-amber-100/60 italic text-sm">
            &quot;If you want to go fast, go alone. If you want to go far, go together.&quot;
          </p>
          <p className="text-amber-400/80 text-xs mt-1">- African Proverb</p>
        </div>
        <div className="bg-gray-800/80 rounded-2xl p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-5"></div>

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


          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-amber-400">Welcome Back!</h2>
              <p className="text-amber-100/60">Sign in to your account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-amber-100">📧 Email Address:</label>
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-amber-100">🔒 Password:</label>
                <input
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  type="password"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                  placeholder="********"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 bg-gray-700 border-amber-500/20 rounded focus:ring-amber-500 text-amber-500" 
                  />
                  <span className="ml-2 text-sm text-amber-100/60">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-amber-400/80 hover:text-amber-400 hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                onClick={login}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20">
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
                    Log In
                  </>
                )}
              </button>

              <div className="text-center mt-4 text-sm text-amber-100/60">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-amber-400/80 hover:text-amber-400 hover:underline transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
