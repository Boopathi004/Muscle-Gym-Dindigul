"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close drawer on Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Trainers", path: "/trainers" },
    { name: "Programs", path: "/programs" },
    { name: "Facilities", path: "/facilities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Transformations", path: "/results" },
    { name: "Locations", path: "/locations" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md border-b border-brand-orange/20 py-2 sm:py-3 shadow-lg shadow-brand-orange/5"
          : "bg-transparent py-3 sm:py-5"
      }`}
      style={{ paddingTop: `max(${isScrolled ? '0.5rem' : '0.75rem'}, var(--safe-area-top))` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-[0_0_20px_rgba(244,208,63,0.6)] border-2 border-brand-yellow/60 bg-black group-hover:shadow-[0_0_30px_rgba(244,208,63,0.9)] transition-all duration-300 flex items-center justify-center p-0.5">
              <Image
                src="/logos/logo-gold-biceps.png"
                alt="Muscle Gym Logo"
                fill
                className="object-contain scale-[1.8] transform hover:scale-[2.0] transition-transform duration-300 drop-shadow-[0_0_12px_rgba(244,208,63,0.9)]"
                priority
              />
            </div>
            <span className="font-bebas text-2xl sm:text-3xl tracking-widest text-brand-yellow group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,235,59,0.5)]">
              MUSCLE <span className="text-white group-hover:text-brand-yellow transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">GYM</span>
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
              href="/join"
              className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black px-5 py-2.5 rounded-full font-bold text-sm tracking-wider hover:scale-105 hover:shadow-[0_0_15px_rgba(255,140,0,0.4)] transition-all duration-300 uppercase"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-gray hover:text-white p-2 rounded-md hover:bg-brand-dark-gray/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-30 mobile-drawer-bg-enter"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer Panel */}
          <div 
            className="lg:hidden fixed inset-y-0 right-0 w-[85%] max-w-sm bg-brand-black/98 backdrop-blur-xl z-40 flex flex-col px-6 py-8 gap-4 border-l border-brand-dark-gray/30 mobile-drawer-enter overflow-y-auto"
            style={{ paddingTop: 'max(2rem, var(--safe-area-top))', paddingBottom: 'max(2rem, var(--safe-area-bottom))' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-gray hover:text-white p-2 rounded-lg hover:bg-brand-dark-gray/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bebas tracking-widest py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "text-brand-yellow bg-brand-yellow/5 border-l-2 border-brand-yellow" 
                        : "text-brand-gray hover:text-white hover:bg-brand-dark-gray/20"
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Join CTA */}
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black py-3.5 rounded-full font-bold text-base tracking-wider hover:shadow-[0_0_15px_rgba(255,140,0,0.4)] transition-all duration-300 uppercase mt-auto"
            >
              Join Now
            </Link>

            {/* Quick Contact */}
            <a
              href="tel:9787045050"
              className="w-full text-center text-brand-gray text-xs font-bold uppercase tracking-widest py-2"
            >
              📞 Call: 9787045050
            </a>
          </div>
        </>
      )}
    </nav>
  );
}
