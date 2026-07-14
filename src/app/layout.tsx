import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialFloat from "@/components/SocialFloat";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Muscle Gym Dindigul | Best Fitness Center & Gym in Dindigul",
  description:
    "Join Muscle Gym Dindigul for weight training, bodybuilding, powerlifting, and fat loss programs. 3 premium locations (Begampur, Trichy Bypass, Palani Road) with imported equipment, AC, and personal training by Master Rajkumar (18+ years experience).",
  keywords: [
    "gym in dindigul",
    "best gym in dindigul",
    "fitness center in dindigul",
    "unisex gym dindigul",
    "bodybuilding coaching dindigul",
    "weight loss programs dindigul",
    "personal trainer dindigul",
    "master rajkumar gym",
  ],
  openGraph: {
    title: "Muscle Gym Dindigul | Best Fitness Center & Gym in Dindigul",
    description:
      "Join Muscle Gym Dindigul. 3 premium branches, imported equipment, AC, and coaching by Master Rajkumar (18+ years experience).",
    type: "website",
    locale: "en_US",
    siteName: "Muscle Gym Dindigul",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-brand-black text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20">{children}</main>
        <Footer />
        {/* Floating social buttons — visible on all pages */}
        <SocialFloat />
      </body>
    </html>
  );
}
