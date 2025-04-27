"use client"
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react"
import { useContext } from "react"
import { AuthContext } from "@/app/context/AuthContext"

interface HeaderProps {
  onMobileMenuOpen: () => void
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const auth = useContext(AuthContext)
  const userData = (auth?.userData as { full_name?: string; email?: string }) || {}

  return (
    <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-sm border-b border-amber-900/30">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button onClick={onMobileMenuOpen} className="text-amber-100/60 hover:text-amber-400 lg:hidden">
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
                      <span className="text-amber-100 mr-1">{ userData?.full_name?.split(' ')[0]}</span>
            <ChevronDown className="h-4 w-4 text-amber-100/60" />
          </div>
        </div>
      </div>
    </header>
  )
}
