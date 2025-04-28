"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const auth = useContext(AuthContext);
  const userData = auth?.userData;
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const pathname = usePathname();
  const [dashboard, setDashboard] = useState(false);
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname)



  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } 
    else {
      setIsLoggedIn(false)
    }
  }, [userData]);

  useEffect(() => {
    if (pathname !== prevPathname) {
      setPrevPathname(pathname); // update stored path
      setMobileMenuOpen(false);  // close menu
    }
  }, [pathname, prevPathname]);


  useEffect(() => {
    setDashboard(pathname === "/dashboard");
  }, [pathname]);

  const handleLogout = () => {
    auth?.logout();              // clear context and tokens
    setIsLoggedIn(false);        // update local state
    router.push("/");       // then navigate
  };

  return (
    <nav className="fixed top-0 left-0 right-0 min-w-full  z-50 bg-gray-900 border-b border-amber-900/30">
      <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center md:gap-50 py-2 lg:gap-160 min-w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mr-3 border-2 border-amber-400/20">
              <span className="text-lg font-bold">AF</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              AfriFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#about"
              className="text-amber-100/80 hover:text-amber-400 transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              className="text-amber-100/80 hover:text-amber-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-amber-100/80 hover:text-amber-400 transition-colors"
            >
              How It Works
            </a>
            <Link
              href="/login"
              prefetch
              className={`${
                isLoggedIn
                  ? "hidden"
                  : "text-amber-100/80 hover:text-amber-400 transition-colors"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              prefetch
              className={`${
                isLoggedIn
                  ? "hidden"
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20"
              }`}
            >
              Sign Up
            </Link>
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20"
                >
                  LogOut
                </button>
                {(dashboard == false) && (
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-amber-100/80 hover:text-amber-400 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col items-start space-y-4 mt-2 px-4 pb-4">
            <a
              href="#about"
              className="text-amber-100/80 hover:text-amber-400 transition-colors w-full"
            >
              About
            </a>
            <a
              href="#features"
              className="text-amber-100/80 hover:text-amber-400 transition-colors w-full"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-amber-100/80 hover:text-amber-400 transition-colors w-full"
            >
              How It Works
            </a>
            <Link
              href="/login"
              prefetch
              className={isLoggedIn?'hidden' : "text-amber-100/80 hover:text-amber-400 transition-colors w-full"}
            >
              Login
            </Link>
            <Link
              prefetch
              href="/signup"
              className={isLoggedIn ? 'hidden' : "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20 w-full text-center"}
            >
              Sign Up
            </Link>
            {isLoggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20 w-full text-center"
                >
                  LogOut
                </button>
                {dashboard == false && (
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 shadow-md shadow-amber-900/20 w-full text-center"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
