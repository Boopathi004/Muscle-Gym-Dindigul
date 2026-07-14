import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialFloat from "@/components/SocialFloat";

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-brand-black text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        {/* Floating social buttons — visible on all pages */}
        <SocialFloat />
      </body>
    </html>
  );
}
