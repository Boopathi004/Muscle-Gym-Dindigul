"use client";

import React, { useState, useEffect } from "react";

export default function SocialFloat() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<"ig" | "wa" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) translateX(${visible ? "0" : "60px"})`,
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Vertical glowing line connector */}
      <div
        className="w-px h-12 rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(244,208,63,0.4), transparent)",
        }}
      />

      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/musclegymdindigul"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered("ig")}
        onMouseLeave={() => setHovered(null)}
        title="Follow us on Instagram"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background:
            hovered === "ig"
              ? "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
              : "rgba(255,255,255,0.06)",
          border: hovered === "ig" ? "2px solid transparent" : "2px solid rgba(255,255,255,0.12)",
          boxShadow:
            hovered === "ig"
              ? "0 0 20px rgba(220,39,67,0.6), 0 0 40px rgba(220,39,67,0.2)"
              : "0 4px 16px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered === "ig" ? "scale(1.18) translateX(-4px)" : "scale(1)",
          cursor: "pointer",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20joining%20Muscle%20Gym%20Dindigul!"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered("wa")}
        onMouseLeave={() => setHovered(null)}
        title="Chat with us on WhatsApp"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background:
            hovered === "wa"
              ? "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
              : "rgba(255,255,255,0.06)",
          border: hovered === "wa" ? "2px solid transparent" : "2px solid rgba(255,255,255,0.12)",
          boxShadow:
            hovered === "wa"
              ? "0 0 20px rgba(37,211,102,0.6), 0 0 40px rgba(37,211,102,0.2)"
              : "0 4px 16px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered === "wa" ? "scale(1.18) translateX(-4px)" : "scale(1)",
          cursor: "pointer",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Pulse ring on WhatsApp for attention */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: 0,
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          border: "2px solid rgba(37,211,102,0.4)",
          animation: "socialPulse 2.4s ease-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        className="w-px h-12 rounded-full"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(244,208,63,0.4), transparent)",
        }}
      />

      <style>{`
        @keyframes socialPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
