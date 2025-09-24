"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Calendar, UserRound, Minus, Plus, Search } from "lucide-react";
import { cities } from "./components/data/cities";
import { features } from "./components/data/features";
import { discounts } from "./components/data/discounts";

export default function HomePage() {
  const [guestCount, setGuestCount] = useState(1);

  const HeroDesktop =
    "https://res.cloudinary.com/omair1996/image/upload/v1758719268/image_1_snewaw.jpg";
  const placeholderHeroMobile =
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=1200&fit=crop";

  return (
    <main className="flex-1">
      <div>
        {/* Desktop Hero */}
        <div className="hidden md:block">
          <div
            className="relative min-h-[90vh] w-full flex flex-col justify-center items-start bg-cover bg-center bg-no-repeat font-sans"
            style={{ backgroundImage: `url("${HeroDesktop}")` }}
          >
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                    <div>Property</div>
                    <div>Client's Feedback</div>
                  </h1>
                </div>

                {/* Search Form */}
                <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
                  <form className="font-sans">
                    <div className="bg-[#FFF9E9] rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg flex flex-row gap-1 sm:gap-2 md:gap-0">
                      {/* City Selection */}
                      <div className="flex-1 sm:border-r md:border-r border-gray-200 sm:pr-2 md:pr-4">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-md py-2 text-xs sm:text-sm md:text-lg h-8 sm:h-10 md:h-12 px-1 sm:px-2 md:px-4 bg-transparent"
                        >
                          <div className="flex items-center gap-1 md:gap-3">
                            <MapPin className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0" />
                            <span style={{ pointerEvents: "none" }}>
                              Properties
                            </span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 opacity-50"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </div>

                      {/* Dates */}
                      <div className="flex-1 sm:border-r md:border-r border-gray-200 sm:px-2 md:px-4">
                        <button
                          className="inline-flex items-center w-full h-8 sm:h-10 md:h-12 justify-start text-left font-normal text-xs sm:text-sm md:text-lg bg-transparent px-1 sm:px-2 md:px-0"
                          type="button"
                        >
                          <div className="flex items-center gap-1 md:gap-3">
                            <Calendar className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700 truncate text-xs sm:text-sm md:text-base">
                              Dates
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Guests */}
                      <div className="flex-1 sm:px-2 md:px-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 md:gap-2">
                          <UserRound className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0" />
                          <button
                            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 p-0 rounded-full hover:bg-gray-100"
                            type="button"
                            disabled={guestCount <= 1}
                            onClick={() =>
                              setGuestCount(Math.max(1, guestCount - 1))
                            }
                          >
                            <Minus className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          </button>
                          <span className="text-xs sm:text-sm md:text-lg text-gray-700 min-w-fit px-1">
                            {guestCount} Rating{guestCount !== 1 ? "s" : ""}
                          </span>
                          <button
                            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 p-0 rounded-full hover:bg-gray-100"
                            type="button"
                            onClick={() => setGuestCount(guestCount + 1)}
                          >
                            <Plus className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Search Button */}
                      <div className="sm:pl-2 md:pl-4">
                        <Link href="/dashboard">
                          <button
                            className="inline-flex items-center justify-center py-2 w-auto h-8 sm:h-10 md:h-12 px-1 sm:px-4 md:px-8 bg-[#284E4C] hover:bg-[#1d3b39] text-white rounded-xl text-xs sm:text-sm md:text-lg font-medium shadow"
                            type="button"
                          >
                            <Search className="h-3 w-3 sm:h-4 sm:w-4 md:hidden" />
                            <span className="hidden sm:inline md:inline">
                              Search
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="md:hidden">
          <div
            className="relative w-full h-[85vh] bg-cover bg-center bg-no-repeat flex flex-col justify-between"
            style={{ backgroundImage: `url("${placeholderHeroMobile}")` }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col justify-center h-full">
              <div className="mb-8 -mt-16">
                <h1 className="text-5xl font-bold text-gray-800 leading-tight tracking-tight">
                  <div>Book</div>
                  <div>Beautiful</div>
                  <div>Stays</div>
                </h1>
              </div>
              <div className="w-full flex justify-start">
                <Link href="/dashboard">
                  <button className="inline-flex items-center justify-center py-2 h-12 px-12 bg-[#284E4C] hover:bg-[#1d3b39] text-white rounded-2xl text-base font-bold shadow-xl">
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cities Section - Mobile */}
        <div className="md:hidden">
          <section className="py-8 px-4 bg-[#F5F1E8] font-sans">
            <div className="max-w-sm mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2
                  style={{
                    fontFamily: "HelveticaNeue-Bold, sans-serif",
                    fontSize: "26px",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  Furnished apartments in top locations
                </h2>
                <p
                  className="leading-relaxed px-2"
                  style={{
                    fontFamily: "HelveticaNeue-Regular, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  The Flex apartments are designed with you in mind – all you
                  have to do is unpack your bags and start living. With flexible
                  terms and seamless service, we offer move-in ready apartments
                  across top cities around the globe. Stay for days, weeks or
                  months, and leave when it suits you.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {cities.map((city, index) => (
                  <div
                    key={city.name}
                    className="w-[150px] sm:w-[170px]"
                    tabIndex={0}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden mb-2 w-[150px] h-[125px] sm:w-[170px] sm:h-[141px]"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.16) 2px 2px 15px 0px",
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${city.image}")` }}
                      ></div>
                      {city.comingSoon && (
                        <div className="absolute inset-0 bg-white bg-opacity-10 flex items-center justify-center">
                          <div className="text-center">
                            <div
                              style={{
                                width: "150px",
                                height: "20px",
                                color: "rgb(255, 255, 255)",
                                fontFamily: "Sathu-Regular, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                textAlign: "center",
                              }}
                            >
                              Coming soon! 🚀
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div
                        className="font-normal text-center"
                        style={{
                          fontFamily: "Sathu, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgb(51, 51, 51)",
                          letterSpacing: "0px",
                        }}
                      >
                        {city.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Cities Section - Desktop */}
        <div className="hidden md:block">
          <section className="py-20 bg-[#FFF9E9]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900">
                  Furnished apartments in top locations
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed">
                  The Flex apartments are designed with you in mind – all you
                  have to do is unpack your bags and start living. With flexible
                  terms and seamless service, we offer move-in ready apartments
                  across top cities around the globe. Stay for days, weeks or
                  months, and leave when it suits you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto">
                {cities.slice(0, 4).map((city) => (
                  <div key={city.name} className="cursor-pointer">
                    <div
                      className="relative overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3]"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 30px" }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                        style={{ backgroundImage: `url("${city.image}")` }}
                      ></div>
                    </div>
                    <div className="mt-4 text-center">
                      <h3
                        className="font-normal tracking-normal"
                        style={{
                          fontFamily: "Sathu, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: "rgb(51, 51, 51)",
                        }}
                      >
                        {city.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section
          className="py-16"
          style={{ backgroundColor: "rgb(255, 253, 246)" }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="md:hidden text-2xl font-bold mb-6">
                Live Better With The Flex
              </h2>
              <h2 className="hidden md:block text-4xl md:text-5xl font-bold mb-6">
                Live Better With The Flex
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={feature.title} className="text-center">
                  <div className="mb-4">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discounts Section */}
        <section
          className="py-20"
          style={{ backgroundColor: "rgb(255, 249, 233)" }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="md:hidden mb-6 text-2xl font-bold">
                Stay Longer, Save More
              </h2>
              <h2 className="hidden md:block text-4xl md:text-5xl font-bold mb-6">
                Stay Longer, Save More
              </h2>
              <p className="md:hidden max-w-6xl mx-auto leading-relaxed text-base">
                The longer you stay, the more you save – great news for those
                looking for hassle free long term rentals, extended business
                trips or relocations.
              </p>
              <p className="hidden md:block text-lg md:text-xl text-gray-600 max-w-6xl mx-auto leading-relaxed">
                The longer you stay, the more you save – great news for those
                looking for hassle free long term rentals, extended business
                trips or relocations.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {discounts.map((item, index) => (
                <div
                  key={item.period}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {item.period}
                    </h3>
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">
                      {item.discount}
                    </div>
                    <p className="text-sm text-gray-500">discount</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="mt-12 text-center">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <span className="text-sm">Manager Dashboard</span>
                  <span className="ml-3 text-sm">✓ Complete</span>
                </Link>
                <Link
                  href="/api/reviews/hostaway"
                  target="_blank"
                  className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full hover:bg-green-200 transition-colors"
                >
                  <code className="font-mono text-sm">
                    /api/reviews/hostaway
                  </code>
                  <span className="ml-3 text-sm">✓ Fully functional</span>
                </Link>
                <Link
                  href="/property/demo"
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <span className="text-sm">Property Reviews</span>
                  <span className="ml-3 text-sm">✓ Complete</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
