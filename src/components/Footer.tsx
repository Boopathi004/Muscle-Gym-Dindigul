import React from "react";
import Link from "next/link";
import { Dumbbell, Phone, Mail, Clock, MapPin } from "lucide-react";
import { INITIAL_BRANCHES } from "@/lib/constants";

// Inline SVG components to replace missing lucide-react social icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-dark-gray/30 pt-12 sm:pt-16 pb-8 relative overflow-hidden" style={{ paddingBottom: 'calc(2rem + var(--safe-area-bottom))' }}>
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-brand-orange/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <span className="p-2 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-lg text-brand-black">
                <Dumbbell className="h-6 w-6 font-bold" />
              </span>
              <span className="font-bebas text-2xl tracking-wider text-white">
                MUSCLE <span className="text-brand-yellow">GYM</span>
              </span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mt-2">
              Dindigul's ultimate fitness arena with imported premium equipment, professional coaches, and three branches. Led by Master Rajkumar with 18+ years of expertise.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/muscle_gym_dindigul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-brand-dark-gray/50 flex items-center justify-center text-brand-gray hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300"
                aria-label="Instagram Dindigul Branch"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/muscle_fitnesstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-brand-dark-gray/50 flex items-center justify-center text-brand-gray hover:text-brand-yellow hover:border-brand-yellow transition-all duration-300"
                aria-label="Instagram Fitness Studio"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-brand-dark-gray/50 flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-300"
                aria-label="Facebook Profile"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4 sm:mb-6 uppercase border-l-2 border-brand-yellow pl-3">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about" className="text-brand-gray hover:text-white hover:text-brand-yellow transition-colors duration-300 py-1 block">
                  About Master Rajkumar
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-brand-gray hover:text-white hover:text-brand-yellow transition-colors duration-300 py-1 block">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-brand-gray hover:text-white hover:text-brand-yellow transition-colors duration-300 py-1 block">
                  Gym Facilities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-brand-gray hover:text-white hover:text-brand-yellow transition-colors duration-300 py-1 block">
                  Gallery & Transformations
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-brand-gray hover:text-white hover:text-brand-yellow transition-colors duration-300 py-1 block">
                  Our Branches
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours Column */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4 sm:mb-6 uppercase border-l-2 border-brand-yellow pl-3">
              Operating Hours
            </h4>
            <div className="flex flex-col gap-4 text-sm text-brand-gray">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-brand-yellow shrink-0" />
                <div>
                  <p className="font-bold text-white">Monday - Saturday</p>
                  <p>05:30 AM - 09:30 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-brand-orange shrink-0" />
                <div>
                  <p className="font-bold text-white">Sunday Timing</p>
                  <p>05:30 AM - 10:00 AM</p>
                </div>
              </div>
              <div className="text-xs italic bg-brand-dark-gray/20 border border-brand-dark-gray/30 p-2.5 rounded text-brand-gray">
                Note: Unisex gym timings apply. Personal coaching schedules can be customized.
              </div>
            </div>
          </div>

          {/* Our Branches Column */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4 sm:mb-6 uppercase border-l-2 border-brand-yellow pl-3">
              Our Branches
            </h4>
            <div className="flex flex-col gap-4 text-sm text-brand-gray">
              {INITIAL_BRANCHES.map((b) => (
                <div key={b.id} className="flex gap-2">
                  <MapPin className="h-4.5 w-4.5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-xs">{b.name}</span>
                    <span className="text-xs line-clamp-2 hover:line-clamp-none transition-all">{b.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-dark-gray/35 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <p>© {new Date().getFullYear()} Muscle Gym Dindigul. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors py-1 block">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors py-1 block">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
