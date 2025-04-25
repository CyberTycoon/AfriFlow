"use client";

import {useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Globe,
  Home,
  Menu,
  MessageSquare,
  PanelLeft,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  X,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useContext(AuthContext); // ✅

  if (!auth) {
    // You can throw an error or handle unauthenticated state
    throw new Error("AuthContext is undefined — are you inside <AuthProvider>?");
  }

  const userData = auth.userData as { full_name?: string; email?: string };
  
  
 // Accessing user data and token from context


  return (
    <div className="min-h-screen bg-gray-900 text-white mt-15">
      {/* African-inspired background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Colored orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500 opacity-10 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500 opacity-10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-900/80"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-gray-800 border-r border-amber-900/30 p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg mr-2 border border-amber-400/20">
                <span className="text-sm font-bold text-gray-900">AF</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                AfriFlow
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-100/60 hover:text-amber-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-1 pt-20">
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-400 bg-amber-500/10 rounded-lg border border-amber-500/20"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <Wallet className="mr-3 h-5 w-5" />
              Transactions
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <Globe className="mr-3 h-5 w-5" />
              Trade
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <ShieldCheck className="mr-3 h-5 w-5" />
              Compliance
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Voice Assistant
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-amber-500/10">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="font-medium text-amber-100">{String(userData?.full_name || "Guest")}</div>
                <div className="text-xs text-amber-100/60">
                  {String(userData?.email || "Guest_email")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col ${
          sidebarOpen ? "lg:w-64" : "lg:w-20"
        } transition-all duration-300`}
      >
        <div className="flex flex-col h-full bg-gray-800 border-r border-amber-900/30">
          <div
            className={`flex items-center ${
              sidebarOpen ? "justify-between" : "justify-center"
            } h-16 px-4 border-b border-amber-900/30`}
          >
            {sidebarOpen ? (
              <>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg mr-2 border border-amber-400/20">
                    <span className="text-sm font-bold text-gray-900">AF</span>
                  </div>
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                    AfriFlow
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-amber-100/60 hover:text-amber-400"
                >
                  <PanelLeft className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-amber-100/60 hover:text-amber-400"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-400 bg-amber-500/10 rounded-lg border border-amber-500/20"
              >
                <Home className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <Wallet className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                {sidebarOpen && <span>Transactions</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <Globe className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                {sidebarOpen && <span>Trade</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <ShieldCheck
                  className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`}
                />
                {sidebarOpen && <span>Compliance</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <MessageSquare
                  className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`}
                />
                {sidebarOpen && <span>Voice Assistant</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <BarChart3 className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                {sidebarOpen && <span>Analytics</span>}
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
              >
                <Settings className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                {sidebarOpen && <span>Settings</span>}
              </Link>
            </nav>
          </div>
          {sidebarOpen && (
            <div className="p-4 border-t border-amber-900/30">
              <div className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-amber-500/10">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-amber-100">
                  {String(userData?.full_name || "Guest")}
                  </div>
                  <div className="text-xs text-amber-100/60">
                  {String(userData?.email || "Guest_email")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div
        className={`${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        } transition-all duration-300`}
      >
        {/* Top navigation */}
        <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-sm border-b border-amber-900/30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-amber-100/60 hover:text-amber-400 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-100/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-64 bg-gray-700/50 border border-amber-500/10 rounded-lg pl-10 pr-4 py-2 text-sm text-amber-100 placeholder-amber-100/40 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-amber-100/60 hover:text-amber-400">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-amber-100 mr-1">{userData?.full_name?.split(" ")[0] || "Guest"}</span>
                <ChevronDown className="h-4 w-4 text-amber-100/60" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-amber-400 mb-2">
              Welcome back, {String(userData?.full_name?.split(" ")[0] || "Guest")}
            </h1>
            <p className="text-amber-100/60">
              Here&apos;s what&apos;s happening with your account today.
            </p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-amber-100/60 text-sm">Total Balance</p>
                  <h3 className="text-2xl font-bold text-amber-100">
                    $24,568.80
                  </h3>
                </div>
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-amber-500" />
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
                  <p className="text-amber-100/60 text-sm">
                    Pending Transactions
                  </p>
                  <h3 className="text-2xl font-bold text-amber-100">8</h3>
                </div>
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-amber-400 flex items-center">
                  $12,350.00
                </span>
                <span className="text-amber-100/40 ml-2">total value</span>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-amber-100/60 text-sm">Compliance Status</p>
                  <h3 className="text-2xl font-bold text-emerald-400">
                    Verified
                  </h3>
                </div>
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-amber-100/40">
                  Last updated: 2 days ago
                </span>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-amber-100/60 text-sm">Exchange Rate</p>
                  <h3 className="text-2xl font-bold text-amber-100">
                    1 USD = 920 NGN
                  </h3>
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

            <div className="bg-gray-800/80 rounded-xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-green-100/60 text-sm">Send Money</p>
                  <h3 className="text-2xl font-bold text-green-100">
                    New Transfer
                  </h3>
                </div>
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                  {/* Optionally replace with a Send icon (e.g., SendHorizonal from Lucide) */}
                </div>
              </div>

              <div className="flex items-center text-sm">
                <span className="text-green-400 flex items-center">$0.00</span>
                <span className="text-green-100/40 ml-2">amount to send</span>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-blue-100/60 text-sm">Receive Money</p>
                  <h3 className="text-2xl font-bold text-blue-100">
                    Incoming Funds
                  </h3>
                </div>
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <ArrowDownLeft className="h-5 w-5 text-blue-500" />
                  {/* You can replace this with Lucide's Banknote, Wallet, or Inbox icon too */}
                </div>
              </div>

              <div className="flex items-center text-sm">
                <span className="text-blue-400 flex items-center">
                  Awaiting Transfer
                </span>
                <span className="text-blue-100/40 ml-2">
                  from external source
                </span>
              </div>
            </div>
          </div>

          {/* Recent transactions and African trade map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <h2 className="text-lg font-bold text-amber-400">
                  Recent Transactions
                </h2>
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
                        <p className="font-medium text-amber-100">
                          Payment from KenyaExport
                        </p>
                        <p className="text-xs text-amber-100/60">
                          Apr 18, 2024 • 10:24 AM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-400">+$5,240.00</p>
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
                        <p className="font-medium text-amber-100">
                          Payment to GhanaConnect
                        </p>
                        <p className="text-xs text-amber-100/60">
                          Apr 16, 2024 • 2:38 PM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-400">-$3,180.00</p>
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
                        <p className="font-medium text-amber-100">
                          Currency Exchange
                        </p>
                        <p className="text-xs text-amber-100/60">
                          Apr 15, 2024 • 9:12 AM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-400">
                        $2,000 → ₦1,840,000
                      </p>
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
                        <p className="font-medium text-amber-100">
                          Payment from SenegalShip
                        </p>
                        <p className="text-xs text-amber-100/60">
                          Apr 12, 2024 • 4:45 PM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-400">+$4,750.00</p>
                      <p className="text-xs text-amber-100/60">Completed</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-amber-400 text-sm hover:underline">
                    View all transactions
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <h2 className="text-lg font-bold text-amber-400">
                  African Trade Map
                </h2>
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
                    <p className="text-sm text-amber-100/80">
                      Your active trade routes across Africa
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-100/60">
                      Nigeria - Kenya
                    </span>
                    <span className="text-sm text-emerald-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-100/60">
                      Nigeria - Ghana
                    </span>
                    <span className="text-sm text-emerald-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-100/60">
                      Nigeria - Senegal
                    </span>
                    <span className="text-sm text-amber-400">Pending</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-amber-400 text-sm hover:underline">
                    Explore trade opportunities
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Voice assistant and compliance sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <h2 className="text-lg font-bold text-amber-400">
                  Voice Assistant
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-xl p-6 mb-4 relative overflow-hidden">
                  <h3 className="text-lg font-medium text-amber-400 mb-2">
                    Try voice commands
                  </h3>
                  <p className="text-sm text-amber-100/60 mb-4">
                    Speak to AfriFlow in your preferred language to perform
                    actions quickly.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                      &quot;Send $2,000 to KenyaExport&quot;
                    </div>
                    <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                      &quot;Check compliance requirements for exporting to
                      Ghana&quot;
                    </div>
                    <div className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm text-amber-100/80">
                      &quot;Convert 5 million Naira to US Dollars&quot;
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-medium rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Voice Assistant
                  </button>
                </div>
                <div className="text-center">
                  <button className="text-amber-400 text-sm hover:underline">
                    View voice command history
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <h2 className="text-lg font-bold text-amber-400">
                  Compliance Updates
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      </div>
                      <h3 className="font-medium text-amber-100">
                        New Trade Agreement: Nigeria-Kenya
                      </h3>
                    </div>
                    <p className="text-sm text-amber-100/60 mb-2">
                      A new trade agreement between Nigeria and Kenya reduces
                      import duties by 15% on agricultural products.
                    </p>
                    <p className="text-xs text-amber-100/40">
                      Updated 2 days ago
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
                        <ShieldCheck className="h-4 w-4 text-amber-500" />
                      </div>
                      <h3 className="font-medium text-amber-100">
                        Regulatory Change: Ghana
                      </h3>
                    </div>
                    <p className="text-sm text-amber-100/60 mb-2">
                      Ghana has updated its export documentation requirements.
                      New forms will be required starting May 15.
                    </p>
                    <p className="text-xs text-amber-100/40">
                      Updated 5 days ago
                    </p>
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      </div>
                      <h3 className="font-medium text-amber-100">
                        AfCFTA Update
                      </h3>
                    </div>
                    <p className="text-sm text-amber-100/60 mb-2">
                      African Continental Free Trade Area has added new
                      provisions for digital services and payments.
                    </p>
                    <p className="text-xs text-amber-100/40">
                      Updated 1 week ago
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-amber-400 text-sm hover:underline">
                    View all compliance updates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
