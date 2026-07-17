"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";
import { INITIAL_BRANCHES } from "@/lib/constants";

export default function Locations() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestBranchId, setNearestBranchId] = useState<number | null>(null);
  const [distances, setDistances] = useState<{ [key: number]: string }>({});
  const [isLocating, setIsLocating] = useState(false);

  // Calculate distance between coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // Distance in km
  };

  const locateUser = () => {
    setIsLocating(true);
    
    // Simulate slight delay and geolocation detection (using realistic Dindigul center offset)
    setTimeout(() => {
      // Mock user coordinates inside Dindigul center (near Dindigul Fort / Bus Stand)
      const mockUserLat = 10.3624;
      const mockUserLng = 77.9698;
      
      setUserLocation({ lat: mockUserLat, lng: mockUserLng });

      let minDistance = Infinity;
      let closestId = 1;
      const computedDistances: { [key: number]: string } = {};

      INITIAL_BRANCHES.forEach((branch) => {
        const dist = calculateDistance(
          mockUserLat,
          mockUserLng,
          branch.coordinates.lat,
          branch.coordinates.lng
        );
        computedDistances[branch.id] = `${dist.toFixed(1)} km away`;
        if (dist < minDistance) {
          minDistance = dist;
          closestId = branch.id;
        }
      });

      setDistances(computedDistances);
      setNearestBranchId(closestId);
      setIsLocating(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-widest text-white page-heading">
            OUR <span className="text-brand-yellow">BRANCHES</span>
          </h1>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-6">
            Train at any of our three fully-equipped premium locations across Dindigul.
          </p>
        </div>

        {/* NEAREST BRANCH FINDER */}
        <section className="max-w-xl mx-auto mb-20 text-center glass-card p-6 sm:p-8 rounded-3xl border border-brand-yellow/20">
          <h3 className="font-bebas text-2xl text-white tracking-wider mb-2">Find Nearest Branch</h3>
          <p className="text-brand-gray text-xs leading-relaxed mb-6">
            Click the button below to simulate finding the closest Muscle Gym branch to your current location in Dindigul.
          </p>
          
          {nearestBranchId ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/10 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow">
                <Compass className="h-6 w-6 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <h4 className="font-bebas text-xl text-white tracking-wide mt-2">
                RECOMMENDED:{" "}
                <span className="text-brand-yellow">
                  {INITIAL_BRANCHES.find((b) => b.id === nearestBranchId)?.name}
                </span>
              </h4>
              <p className="text-brand-gray text-xs">
                Distance: {distances[nearestBranchId]}. Convenient parking, imported machines & pro trainers.
              </p>
              <button
                onClick={() => {
                  setNearestBranchId(null);
                  setDistances({});
                }}
                className="mt-4 text-xs font-bold text-brand-gray hover:text-brand-yellow uppercase tracking-widest underline cursor-pointer"
              >
                Clear Location
              </button>
            </div>
          ) : (
            <button
              onClick={locateUser}
              disabled={isLocating}
              className="bg-gradient-to-r from-brand-yellow to-brand-orange text-brand-black font-extrabold text-xs uppercase px-8 py-3.5 rounded-xl hover:scale-102 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              {isLocating ? (
                <>Locating Branches...</>
              ) : (
                <>Locate Closest Branch</>
              )}
            </button>
          )}
        </section>

        {/* BRANCHES LIST */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {INITIAL_BRANCHES.map((branch) => {
            const isClosest = branch.id === nearestBranchId;
            return (
              <div
                key={branch.id}
                className={`glass-card rounded-3xl border flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300 ${
                  isClosest 
                    ? "border-brand-yellow shadow-[0_4px_25px_rgba(244,208,63,0.06)]" 
                    : "border-brand-dark-gray/50"
                }`}
              >
                {/* Google Maps Embed */}
                <div className="relative h-44 border-b border-brand-dark-gray/30 overflow-hidden group/map">
                  <iframe
                    src={`https://maps.google.com/maps?q=${branch.coordinates.lat},${branch.coordinates.lng}&z=16&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${branch.name}`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                  {/* Clickable overlay to open Google Maps */}
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex flex-col items-end justify-end p-3 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/map:opacity-100 transition-opacity duration-300"
                  >
                    <span className="bg-brand-yellow text-brand-black text-[9px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                      <MapPin className="h-3 w-3" /> Open in Maps
                    </span>
                  </a>
                  {/* Nearest badge */}
                  {isClosest && (
                    <span className="absolute top-3 right-3 z-20 bg-brand-yellow text-brand-black text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      NEAREST: {distances[branch.id]}
                    </span>
                  )}
                </div>


                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bebas text-2xl text-white tracking-wide mb-1 group-hover:text-brand-yellow transition-colors">
                      {branch.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-4 text-xs font-bold text-brand-orange">
                      <span>⭐ {branch.rating} / 5</span>
                      <span className="text-brand-dark-gray">•</span>
                      <span className="text-brand-gray font-medium">{branch.reviews} Reviews</span>
                    </div>

                    <div className="flex flex-col gap-3 text-xs text-brand-gray mb-6">
                      <div className="flex gap-2 items-start">
                        <MapPin className="h-4.5 w-4.5 text-brand-yellow shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{branch.address}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Clock className="h-4.5 w-4.5 text-brand-yellow shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white">Mon - Sat: {branch.hours.weekdays}</p>
                          <p>Sun: {branch.hours.sunday}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Phone className="h-4.5 w-4.5 text-brand-yellow shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          {branch.phone.map((ph, i) => (
                            <a key={i} href={`tel:${ph}`} className="hover:text-brand-yellow transition-colors">{ph}</a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="border-t border-brand-dark-gray/30 pt-4 mb-6">
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-2">Amenities:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {branch.amenities.map((am, i) => (
                          <span key={i} className="text-[10px] bg-brand-dark-gray/30 border border-brand-dark-gray/50 px-2 py-0.5 rounded text-brand-gray">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-brand-dark-gray/30 pt-4">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-brand-yellow/20 to-brand-orange/10 border border-brand-yellow/50 hover:border-brand-yellow hover:from-brand-yellow/30 text-brand-yellow text-center py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <MapPin className="h-4 w-4" /> Get Directions
                    </a>
                    <a
                      href={`tel:${branch.phone[0]}`}
                      className="w-full bg-brand-dark-gray/35 border border-brand-dark-gray/70 hover:border-brand-yellow hover:text-brand-yellow text-center py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      <Phone className="h-4 w-4" /> Call Branch
                    </a>
                    <a
                      href={`https://wa.me/91${branch.phone[0]}?text=Hi,%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(branch.name)}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-brand-dark-gray/35 border border-brand-dark-gray/70 hover:border-brand-orange hover:text-brand-orange text-center py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      WhatsApp Branch
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </div>
    </div>
  );
}
