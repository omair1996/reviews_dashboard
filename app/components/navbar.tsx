"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Info, BookOpen, Mail, Menu } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const logo =
    "https://res.cloudinary.com/omair1996/image/upload/v1758721176/image2_jjz6ac.webp";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashboardNavItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icons: <Info className="h-4 w-4 mr-2" />,
    },
    {
      href: "/property/demo",
      label: "Public Reviews",
      icons: <BookOpen className="h-4 w-4 mr-2" />,
    },
    {
      href: "/api/reviews/hostaway",
      label: "Data",
      icons: <Mail className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header
      className={`fixed left-0 right-0 w-full z-50 top-0 shadow-sm transition-all duration-300 ${
        isScrolled ? "bg-[#284E4C]" : "bg-[#FFFDF6]"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={logo}
              alt="Flex Logo"
              className={`h-10 w-auto object-contain transition duration-300 ${
                isScrolled ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {dashboardNavItems.map(({ href, label, icons }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 transition-colors ${
                  pathname === href
                    ? isScrolled
                      ? "text-green-400"
                      : "text-green-600"
                    : isScrolled
                    ? "text-white"
                    : "text-gray-700"
                } hover:${isScrolled ? "bg-white/10" : "bg-gray-100"}`}
              >
                {icons}
                {label}
              </Link>
            ))}

            {/* Language Selector */}
            <button
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 transition-colors ${
                isScrolled ? "text-white" : "text-gray-700"
              }`}
              type="button"
            >
              <span className="flex items-center">
                <span className="pr-2">🇬🇧</span>
                English
              </span>
            </button>

            {/* Currency Selector */}
            <button
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 transition-colors ${
                isScrolled ? "text-white" : "text-gray-700"
              }`}
              type="button"
            >
              <span className="text-lg">£</span>
              <span className="text-xs font-medium ml-1">GBP</span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language */}
            <button
              className={`inline-flex items-center text-xs h-9 px-3 rounded-full border-2 border-transparent transition-all duration-200 ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <span className="text-lg">🇬🇧</span>
              <span className="text-xs ml-1">GB</span>
            </button>

            {/* Mobile Currency */}
            <button
              className={`inline-flex items-center text-xs h-9 px-3 rounded-full border-2 border-transparent transition-all duration-200 font-bold ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <span className="text-lg">£</span>
              <span className="text-xs ml-1">GBP</span>
            </button>

            {/* Mobile Menu */}
            <button
              className={`inline-flex items-center justify-center h-9 w-9 rounded-full border-2 border-transparent transition-all duration-200 ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
