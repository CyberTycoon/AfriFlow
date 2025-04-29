"use client"

import type React from "react"
import { useState, useEffect, useContext} from "react"
import Sidebar from "@/app/components/dashboard/sidebar"
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  User,
  X,
  Home,
  Wallet,
  Globe,
  ShieldCheck,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {AuthContext} from "@/app/context/AuthContext"


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const auth = useContext(AuthContext)
  const userData = ((auth?.userData?.tokenData) as { full_name?: string; email?: string }) || {}
  const userName = userData.full_name || "User"
  // Navigation items for mobile menu
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/transactions", icon: Wallet, label: "Transactions" },
    { href: "/dashboard/trade", icon: Globe, label: "Trade" },
    { href: "/dashboard/compliance", icon: ShieldCheck, label: "Compliance" },
    { href: "/dashboard/voice", icon: MessageSquare, label: "Voice Assistant" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  // Detect sidebar state changes from the sidebar component
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-sidebar-state") {
          const sidebarState = document.querySelector("[data-sidebar-state]")?.getAttribute("data-sidebar-state")
          setSidebarOpen(sidebarState === "open")
        }
      })
    })

    const sidebarStateElement = document.querySelector("[data-sidebar-state]")
    if (sidebarStateElement) {
      observer.observe(sidebarStateElement, { attributes: true })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setMobileMenuOpen(false)}></div>
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
            <button onClick={() => setMobileMenuOpen(false)} className="text-amber-100/60 hover:text-amber-400">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  pathname === item.href
                    ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                    : "text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg border border-amber-500/10">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
              </div>
              <div>
                              <div className="font-medium text-amber-100">{ userName}</div>
                              <div className="text-xs text-amber-100/60">{ userData.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <div className={`${sidebarOpen ? "lg:pl-64" : "lg:pl-20"} transition-all duration-300 mt-16 md:mt-28 lg:mt-15`}>
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
                              <span className="text-amber-100 mr-1">{userData ? userName.split(' ')[0] : 'user'}</span>
                <ChevronDown className="h-4 w-4 text-amber-100/60" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
