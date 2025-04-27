import { BarChart3, Globe, Home, MessageSquare, PanelLeft, Settings, ShieldCheck, Wallet } from "lucide-react"

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500 opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500 opacity-10 blur-3xl animate-pulse"></div>
        </div>
      </div>

      

      {/* Main content */}
      <div className="transition-all duration-300">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-sm border-b border-amber-900/30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-64 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-6 w-6 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="hidden sm:flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse mr-2"></div>
                <div className="h-5 w-16 bg-gray-700 rounded-lg animate-pulse mr-1"></div>
                <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-800 rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-80 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Stats overview skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="h-4 w-32 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-7 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-16 bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded-lg animate-pulse ml-2"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent transactions and African trade map skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <div className="h-6 w-48 bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse mr-4"></div>
                        <div>
                          <div className="h-5 w-48 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
                          <div className="h-4 w-32 bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-5 w-24 bg-gray-700 rounded-lg animate-pulse mb-1"></div>
                        <div className="h-4 w-16 bg-gray-700 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="h-5 w-40 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
              <div className="p-6 border-b border-amber-900/30">
                <div className="h-6 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="p-6">
                <div className="relative h-64 bg-gray-700/30 rounded-lg overflow-hidden mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="h-4 w-32 bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="h-5 w-48 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice assistant and compliance sections skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
                <div className="p-6 border-b border-amber-900/30">
                  <div className="h-6 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-700/30 rounded-xl p-6 mb-4 animate-pulse">
                    <div className="h-6 w-48 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-8 w-full bg-gray-700 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-10 w-full bg-gray-700 rounded-lg animate-pulse mt-4"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-5 w-48 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
