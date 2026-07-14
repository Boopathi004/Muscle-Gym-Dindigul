"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Facilities", path: "/facilities" },
    { name: "Trainers", path: "/trainers" },
    { name: "Membership", path: "/membership" },
    { name: "Gallery", path: "/gallery" },
    { name: "Transformations", path: "/results" },
    { name: "Locations", path: "/locations" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-orange/20 py-3 shadow-lg shadow-brand-orange/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="p-2 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-lg text-brand-black transform transition-transform group-hover:rotate-12 duration-300">
              <Dumbbell className="h-6 w-6 font-bold" />
            </span>
            <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-brand-yellow transition-colors duration-300">
              MUSCLE <span className="text-brand-yellow">GYM</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${
                    isActive ? "text-brand-yellow" : "text-brand-gray hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-brand-gray hover:text-brand-yellow p-2 transition-colors duration-300"
              title="Admin Portal"
            >
              <ShieldAlert className="h-5 w-5" />
            </Link>
            <Link
              href="/join"
              className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black px-5 py-2.5 rounded-full font-bold text-sm tracking-wider hover:scale-105 hover:shadow-[0_0_15px_rgba(255,140,0,0.4)] transition-all duration-300 uppercase"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/admin"
              className="text-brand-gray hover:text-brand-yellow p-2 transition-colors"
            >
              <ShieldAlert className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-gray hover:text-white p-2 rounded-md hover:bg-brand-dark-gray/30 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-brand-black/98 z-40 flex flex-col px-6 py-8 gap-6 border-t border-brand-dark-gray/30">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bebas tracking-widest py-2 border-b border-brand-dark-gray/20 ${
                    isActive ? "text-brand-yellow" : "text-brand-gray"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link
            href="/join"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black py-3.5 rounded-full font-bold text-base tracking-wider hover:shadow-[0_0_15px_rgba(255,140,0,0.4)] transition-all duration-300 uppercase mt-auto"
          >
            Join Now
          </Link>
        </div>
      )}
    </nav>
  );
}
