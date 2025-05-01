"use client"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "@/app/context/AuthContext"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  PanelLeft,
  User,
  Home,
  Menu,
  Wallet,
  Globe,
  ShieldCheck,
  MessageSquare,
  Settings,
  BarChart3,
  X,
  UserRoundCheck,
  Store,
} from "lucide-react"

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Try to get auth context, but don't throw error if not available
  const auth = useContext(AuthContext)
  const userData = ((auth?.userData?.tokenData) as { full_name?: string; email?: string }) || {}

  // Navigation items
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/transactions", icon: Wallet, label: "Transactions" },
    { href: "/dashboard/trade", icon: Globe, label: "Trade" },
    { href: "/dashboard/meet-an-expert", icon: UserRoundCheck, label: "Meet an Expert" },
    { href: "/dashboard/marketplace", icon: Store, label: "Marketplace" },
    { href: "/dashboard/chatbot", icon: ShieldCheck, label: "Compliance" },
    { href: "/dashboard/voice", icon: MessageSquare, label: "Voice Assistant" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <>
      {/* Mobile menu */}
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
                <div className="font-medium text-amber-100">{userData?.full_name || "Guest"}</div>
                <div className="text-xs text-amber-100/60">{userData?.email || "guest@example.com"}</div>
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
                <button onClick={() => setSidebarOpen(false)} className="text-amber-100/60 hover:text-amber-400">
                  <PanelLeft className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button onClick={() => setSidebarOpen(true)} className="text-amber-100/60 hover:text-amber-400">
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg ${
                    pathname === item.href
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                      : "text-amber-100/60 hover:text-amber-400 hover:bg-amber-500/10"
                  }`}
                >
                  <item.icon className={`${sidebarOpen ? "mr-3" : ""} h-5 w-5`} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
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
                  <div className="font-medium text-amber-100">{userData?.full_name || "User"}</div>
                  <div className="text-xs text-amber-100/60">{userData?.email || "User@example.com"}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed z-40 bottom-4 right-4 lg:hidden bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 rounded-full p-3 shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Export sidebar state for layout adjustments */}
      <div className="hidden" data-sidebar-state={sidebarOpen ? "open" : "closed"}></div>
    </>
  )
}

export default Sidebar
