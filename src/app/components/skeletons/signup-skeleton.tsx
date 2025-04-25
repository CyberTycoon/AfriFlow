export default function SignupSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500 opacity-20 blur-3xl animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo skeleton */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gray-800 rounded-xl animate-pulse mb-4"></div>
          <div className="h-8 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>

        {/* Step indicator skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse flex items-center justify-center"></div>
                {step < 3 && <div className="w-12 h-1 bg-gray-700 animate-pulse"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Form container skeleton */}
        <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50"></div>

          {/* Title skeleton */}
          <div className="text-center mb-6">
            <div className="h-7 w-48 bg-gray-700 rounded-lg animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-64 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
          </div>

          {/* Form fields skeleton - showing multiple fields to represent any step */}
          <div className="space-y-4">
            {/* Field 1 */}
            <div>
              <div className="h-5 w-32 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
              <div className="w-full h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Field 2 */}
            <div>
              <div className="h-5 w-36 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
              <div className="w-full h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Field 3 */}
            <div>
              <div className="h-5 w-28 bg-gray-700 rounded-lg animate-pulse mb-2"></div>
              <div className="w-full h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Field 4 - checkbox or toggle */}
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="ml-2 h-4 w-48 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>

            {/* Button skeleton */}
            <div className="w-full h-12 bg-gray-700 rounded-lg animate-pulse mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
