"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { ArrowUpRight, ArrowDownLeft, Globe, ShieldCheck, MessageSquare } from "lucide-react"
import DashboardSkeleton from "../components/skeletons/dashboard-skeleton"
import { AuthContext } from "@/app/context/AuthContext" 

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const auth = useContext(AuthContext)
  const userData = (auth?.userData as { full_name?: string; email?: string; balance?: number}) || {}
  const userName = userData.full_name || "User"
  const balance = userData.balance || 0

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  useEffect(() => {

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-400 mb-2">Welcome back, { userName.split(" ")[0]}</h1>
        <p className="text-amber-100/60">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-amber-100/60 text-sm">Total Balance</p>
              <h3 className="text-2xl font-bold text-amber-100"> { formatCurrency(balance)}</h3>
            </div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +2.5%
            </span>
            <span className="text-amber-100/40 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-amber-100/60 text-sm">Pending Transactions</p>
              <h3 className="text-2xl font-bold text-amber-100">8</h3>
            </div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-amber-400 flex items-center">₦12,350.00</span>
            <span className="text-amber-100/40 ml-2">total value</span>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-amber-100/60 text-sm">Compliance Status</p>
              <h3 className="text-2xl font-bold text-emerald-400">Verified</h3>
            </div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-amber-100/40">Last updated: 2 days ago</span>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-amber-100/60 text-sm">Exchange Rate</p>
              <h3 className="text-2xl font-bold text-amber-100">1 USD = 920 NGN</h3>
            </div>
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-red-400 flex items-center">
              <ArrowDownLeft className="h-3 w-3 mr-1" /> -1.2%
            </span>
            <span className="text-amber-100/40 ml-2">from yesterday</span>
          </div>
        </div>
      </div>

      {/* Recent transactions and African trade map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Transaction 1 */}
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                    <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Payment from KenyaExport</p>
                    <p className="text-xs text-amber-100/60">Apr 18, 2024 • 10:24 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-400">+₦5,240.00</p>
                  <p className="text-xs text-amber-100/60">Completed</p>
                </div>
              </div>

              {/* Transaction 2 */}
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                    <ArrowUpRight className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Payment to GhanaConnect</p>
                    <p className="text-xs text-amber-100/60">Apr 16, 2024 • 2:38 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-400">-₦3,180.00</p>
                  <p className="text-xs text-amber-100/60">Completed</p>
                </div>
              </div>

              {/* Transaction 3 */}
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                    <ArrowUpRight className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Currency Exchange</p>
                    <p className="text-xs text-amber-100/60">Apr 15, 2024 • 9:12 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-amber-400">₦2,000 → ₦1,840,000</p>
                  <p className="text-xs text-amber-100/60">Completed</p>
                </div>
              </div>

              {/* Transaction 4 */}
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                    <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Payment from SenegalShip</p>
                    <p className="text-xs text-amber-100/60">Apr 12, 2024 • 4:45 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-400">+₦4,750.00</p>
                  <p className="text-xs text-amber-100/60">Completed</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-amber-400 text-sm hover:underline">View all transactions</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">African Trade Map</h2>
          </div>
          <div className="p-6">
            <div className="relative h-64 bg-gray-700/30 rounded-lg overflow-hidden mb-4">
              <Image
                src="/trade-map.png"
                alt="African trade map"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm text-amber-100/80">Your active trade routes across Africa</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-100/60">Nigeria - Kenya</span>
                <span className="text-sm text-emerald-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-100/60">Nigeria - Ghana</span>
                <span className="text-sm text-emerald-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-100/60">Nigeria - Senegal</span>
                <span className="text-sm text-amber-400">Pending</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-amber-400 text-sm hover:underline">Explore trade opportunities</button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice assistant and compliance sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Voice Assistant</h2>
          </div>
          <div className="p-6">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-xl p-6 mb-4 relative overflow-hidden">
              <h3 className="text-lg font-medium text-amber-400 mb-2">Try voice commands</h3>
              <p className="text-sm text-amber-100/60 mb-4">
                Speak to AfriFlow in your preferred language to perform actions quickly.
              </p>
              <div className="space-y-2">
                <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                  "Send ₦2,000 to KenyaExport"
                </div>
                <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                  "Check compliance requirements for exporting to Ghana"
                </div>
                <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                  "Convert 5 million Naira to US Dollars"
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-medium rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Voice Assistant
              </button>
            </div>
            <div className="text-center">
              <button className="text-amber-400 text-sm hover:underline">View voice command history</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Compliance Updates</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <h3 className="font-medium text-amber-100">New Trade Agreement: Nigeria-Kenya</h3>
                </div>
                <p className="text-sm text-amber-100/60 mb-2">
                  A new trade agreement between Nigeria and Kenya reduces import duties by 15% on agricultural products.
                </p>
                <p className="text-xs text-amber-100/40">Updated 2 days ago</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
                    <ShieldCheck className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="font-medium text-amber-100">Regulatory Change: Ghana</h3>
                </div>
                <p className="text-sm text-amber-100/60 mb-2">
                  Ghana has updated its export documentation requirements. New forms will be required starting May 15.
                </p>
                <p className="text-xs text-amber-100/40">Updated 5 days ago</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <h3 className="font-medium text-amber-100">AfCFTA Update</h3>
                </div>
                <p className="text-sm text-amber-100/60 mb-2">
                  African Continental Free Trade Area has added new provisions for digital services and payments.
                </p>
                <p className="text-xs text-amber-100/40">Updated 1 week ago</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-amber-400 text-sm hover:underline">View all compliance updates</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
