"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  ShieldCheck,
  Zap,
  Users,
  BarChart,
} from "lucide-react";


export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute right-0 top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-0 bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

        {/* African pattern border */}
        <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-b from-amber-500/20 via-orange-500/20 to-amber-500/20 hidden lg:block">
          <div className="absolute inset-0 bg-[url('/patterns/adinkra-pattern.svg')] bg-repeat-y opacity-30"></div>
        </div>
        <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-b from-amber-500/20 via-orange-500/20 to-amber-500/20 hidden lg:block">
          <div className="absolute inset-0 bg-[url('/patterns/adinkra-pattern.svg')] bg-repeat-y opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-block mb-4 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
                <span className="text-amber-400 font-medium">
                  Revolusionized African Trade
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300">
                  Empowering African
                </span>
                <br />
                <span className="text-white">Business & Trade</span>
              </h1>
              <p className="text-xl text-amber-100/80 mb-10 max-w-xl">
                AfriFlow makes cross-border transactions and compliance easy for
                African MSMEs. Send money, check regulations, and convert
                currencies with Afriflow.
              </p>
              <p className="text-2xl text-amber-300 mb-10 max-w-xl">
               Trade In Africa, For Africa, By Africans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-8 py-4 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#how-it-works"
                  className="bg-gray-800 text-amber-400 border border-amber-500/20 px-8 py-4 rounded-lg font-medium hover:bg-gray-800/80 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl transform rotate-6"></div>
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl transform -rotate-6"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/20 shadow-2xl shadow-amber-900/20">
                <Image
                  src="/image.jpg"
                  alt="African marketplace"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative z-10 py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative">
            <div className="inline-block mb-2 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
              <span className="text-amber-400 font-medium">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto"></div>

            {/* African pattern decorations */}
            <div className="absolute left-0 top-1/2 w-16 h-16 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-20 hidden lg:block"></div>
            <div className="absolute right-0 top-1/2 w-16 h-16 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-20 hidden lg:block"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl transform -rotate-3"></div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/20 shadow-xl shadow-amber-900/20">
                  <Image
                    src="/hero.jpg"
                    alt="African business people"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-[url('/patterns/adinkra-unity.svg')] bg-no-repeat bg-contain opacity-80"></div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-amber-400">
                Empowering African Trade Through Voice Technology
              </h3>
              <p className="text-amber-100/80 mb-6 text-lg">
                AfriFlow is a revolutionary cross-border payment and trade
                system designed specifically for African Micro, Small, and
                Medium Enterprises (MSMEs). We understand the unique challenges
                faced by African businesses in the global marketplace.
              </p>
              <p className="text-amber-100/80 mb-6 text-lg">
                Our mission is to break down barriers to international trade by
                making cross-border transactions, regulatory compliance, and
                currency conversion accessible to everyone - regardless of
                technical expertise or location.
              </p>
              <div className="flex items-center p-4 bg-gray-800 rounded-xl border border-amber-500/20">
                <div className="h-12 w-1 bg-amber-500 mr-4"></div>
                <p className="text-xl font-medium text-amber-300">
                  &quot;We&apos;re building the future of African trade — where businesses connect, comply, and grow&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-wisdom.svg')] bg-no-repeat bg-contain opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4 text-amber-400">
                  Our Vision
                </h4>
                <p className="text-amber-100/80 mb-6">
                  To create a seamless, inclusive financial ecosystem where
                  every African business can participate in global trade with
                  confidence and ease.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-strength.svg')] bg-no-repeat bg-contain opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4 text-amber-400">
                  Our Mission
                </h4>
                <p className="text-amber-100/80 mb-6">
                  To leverage artificial intelligence to
                  simplify cross-border transactions and trade compliance for
                  African MSMEs, making international business accessible by
                  local businesses.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-unity.svg')] bg-no-repeat bg-contain opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4 text-amber-400">
                  Our Values
                </h4>
                <ul className="text-amber-100/80 space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                    <span>Accessibility & Inclusion</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                    <span>Innovation & Excellence</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                    <span>Security & Trust</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mr-2"></div>
                    <span>Empowerment & Growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-16 md:py-24 bg-gray-800/50 border-y border-amber-900/30 overflow-hidden"
      >
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

        {/* African pattern background */}
        <div className="absolute inset-0 bg-[url('/patterns/mud-cloth.svg')] bg-repeat opacity-[0.02]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
              <span className="text-amber-400 font-medium">Our Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AfriFlow
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto"></div>
            <p className="text-xl text-amber-100/80 mt-6 max-w-3xl mx-auto">
              Our platform offers unique advantages designed specifically for
              African businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <MessageSquare className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Voice-First Interface
              </h3>
              <p className="text-amber-100/80">
                Interact with our platform using natural voice commands in your
                preferred language, including English, French, Swahili, Yoruba,
                and Hausa.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <Globe className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Cross-Border Payments
              </h3>
              <p className="text-amber-100/80">
                Send and receive international payments with ease, with
                competitive exchange rates and lower fees than traditional
                banking systems.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <ShieldCheck className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Regulatory Compliance
              </h3>
              <p className="text-amber-100/80">
                Navigate complex trade regulations with our AI-powered
                compliance assistant that keeps you informed about requirements
                and changes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Real-Time Currency Conversion
              </h3>
              <p className="text-amber-100/80">
                Convert between multiple currencies instantly with up-to-date
                exchange rates and transparent fee structures.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <Users className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Multi-Language Support
              </h3>
              <p className="text-amber-100/80">
                Our platform supports multiple African languages, making it
                accessible to businesses across the continent regardless of
                their primary language.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/20">
                <BarChart className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                Trade Insights
              </h3>
              <p className="text-amber-100/80">
                Access market intelligence, trade opportunities, and business
                insights tailored to your industry and region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative z-10 py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
              <span className="text-amber-400 font-medium">
                Getting Started
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AfriFlow Works
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto"></div>
            <p className="text-xl text-amber-100/80 mt-6 max-w-3xl mx-auto">
              Getting started with AfriFlow is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xl text-gray-900 border-2 border-amber-400/20">
                1
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <h3 className="text-xl font-bold mb-4 mt-4 text-amber-400">
                Create Your Account
              </h3>
              <p className="text-amber-100/80 mb-6">
                Sign up for AfriFlow in minutes. Choose your preferred language
                and set up your business profile.
              </p>
              <div className="h-48 bg-gray-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-amber-500/10">
                <Image
                  src="/signup.jpg"
                  alt="Create account"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xl text-gray-900 border-2 border-amber-400/20">
                2
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <h3 className="text-xl font-bold mb-4 mt-4 text-amber-400">
                Connect Your Business
              </h3>
              <p className="text-amber-100/80 mb-6">
                Link your existing bank accounts or mobile money services to
                start making and receiving payments.
              </p>
              <div className="h-48 bg-gray-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-amber-500/10">
                <Image
                  src="/connect.jpg"
                  alt="Connect business"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xl text-gray-900 border-2 border-amber-400/20">
                3
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/patterns/adinkra-symbol.svg')] bg-no-repeat bg-contain opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <h3 className="text-xl font-bold mb-4 mt-4 text-amber-400">
                Start Transacting
              </h3>
              <p className="text-amber-100/80 mb-6">
                Use voice commands or the app interface to send money, check
                regulations, or convert currencies.
              </p>
              <div className="h-48 bg-gray-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-amber-500/10">
                <Image
                  src="/pay.jpg"
                  alt="Start transacting"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <div className="hidden md:block absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16 md:py-24 bg-gray-800/50 border-y border-amber-900/30 overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
              <span className="text-amber-400 font-medium">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full mr-4 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Customer"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-400">Adeola Johnson</h4>
                  <p className="text-sm text-amber-100/60">
                    Textile Exporter, Nigeria
                  </p>
                </div>
              </div>
              <p className="text-amber-100/80 italic">
                &quot;AfriFlow has transformed how I manage international
                payments. The voice commands in Yoruba make it so easy to use,
                and I&apos;ve saved thousands on transaction fees.&quot;
              </p>
              <div className="mt-4 flex text-amber-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full mr-4 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Customer"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-400">Kwame Osei</h4>
                  <p className="text-sm text-amber-100/60">
                    Coffee Exporter, Ghana
                  </p>
                </div>
              </div>
              <p className="text-amber-100/80 italic">
                &quot;The regulatory compliance features have been a
                game-changer for my business. I no longer worry about missing
                important export requirements or changes in regulations.&quot;
              </p>
              <div className="mt-4 flex text-amber-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-amber-500/20 relative group hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/10">
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full mr-4 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Customer"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-amber-400">Amina Kimeu</h4>
                  <p className="text-sm text-amber-100/60">
                    Tech Entrepreneur, Kenya
                  </p>
                </div>
              </div>
              <p className="text-amber-100/80 italic">
                &quot;As a tech startup founder, I appreciate how AfriFlow
                combines cutting-edge voice technology with practical financial
                tools. It&apos;s made our international payments seamless.&quot;
              </p>
              <div className="mt-4 flex text-amber-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24 overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-8 md:p-12 border border-amber-500/20 relative overflow-hidden shadow-xl shadow-amber-900/10">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

            {/* African pattern background */}
            <div className="absolute inset-0 bg-[url('/patterns/kente-pattern.svg')] bg-repeat opacity-[0.02]"></div>

            <div className="relative z-10 text-center">
              <div className="inline-block mb-4 px-4 py-1 bg-amber-900/30 rounded-full border border-amber-500/20">
                <span className="text-amber-400 font-medium">
                  Join AfriFlow Today
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-amber-100/80 mb-8 max-w-3xl mx-auto">
                Join thousands of African businesses already using AfriFlow to
                simplify their international trade and payments. Get started
                today and experience the future of voice-powered finance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold px-8 py-4 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20 group"
                >
                  Sign Up Now{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#"
                  className="bg-gray-700 text-amber-400 border border-amber-500/20 px-8 py-4 rounded-lg font-medium hover:bg-gray-700/80 transition-all duration-300"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-800/50 border-t border-amber-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-400">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-400">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-400">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-400">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-100/60 hover:text-amber-400 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg mr-2 border border-amber-400/20">
                <span className="text-sm font-bold">AF</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                AfriFlow
              </span>
            </div>
            <div className="text-amber-100/60 text-sm">
              © 2024 AfriFlow. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-amber-100/60 hover:text-amber-400 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-amber-100/60 hover:text-amber-400 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-amber-100/60 hover:text-amber-400 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-amber-100/60 hover:text-amber-400 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
