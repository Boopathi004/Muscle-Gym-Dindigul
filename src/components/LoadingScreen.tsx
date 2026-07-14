"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderExit, setLoaderExit] = useState(false);

  useEffect(() => {
    // Timing matching SriCakes preloader (2.2s active, 2.9s fully removed)
    const exitTimer = setTimeout(() => setLoaderExit(true), 2200);
    const hideTimer = setTimeout(() => setIsLoading(false), 2900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className={`loader-screen ${loaderExit ? "exit" : ""}`}>
        {/* Decorative thin concentric gym arcs */}
        <div
          className="loader-arc"
          style={{
            width: "300px",
            height: "300px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="loader-arc"
          style={{
            width: "440px",
            height: "440px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="loader-arc"
          style={{
            width: "580px",
            height: "580px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        {/* Pulse glow background behind logo */}
        <div className="loader-glow"></div>

        {/* Logo badge with bounce-in */}
        <div className="loader-logo">🏋️</div>

        {/* Orbiting fitness indicators */}
        <div className="loader-orbit">
          <span>💪</span>
          <span>🔥</span>
          <span>⚡</span>
          <span>🏆</span>
          <span>🥇</span>
        </div>

        {/* Gym title branding with shimmer */}
        <p className="loader-title font-bebas text-white">
          MUSCLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">GYM</span>
        </p>

        {/* Energizing subtitle tagline */}
        <p className="loader-tagline font-bold">BUILD STRENGTH · BURN LIMITS</p>

        {/* Animated loading dots sequence */}
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Shimmering horizontal progress track */}
        <div className="loader-progress-track">
          <div className="loader-progress-fill"></div>
        </div>
      </div>

      {/* Slide-up curtain transition */}
      {loaderExit && <div className="loader-curtain"></div>}
    </>
  );
}
