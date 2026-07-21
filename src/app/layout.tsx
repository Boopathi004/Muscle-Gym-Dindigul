import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialFloat from "@/components/ui/SocialFloat";
import LoadingScreen from "@/components/layout/LoadingScreen";



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
  icons: {
    icon: "/logos/logo-silhouette.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logos/logo-silhouette.png" type="image/png" />
      </head>
      <body className="bg-brand-black text-white min-h-screen flex flex-col antialiased overflow-x-hidden">
        {/* LocalBusiness JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ExerciseGym",
                "name": "Muscle Gym, Bagambur",
                "image": "https://muscle-gym-dindigul.vercel.app/logo.png",
                "telephone": "+919787045050",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1st Floor, Vaigai Complex, Near Rasi Petrol Bunk, K.Paraipatti",
                  "addressLocality": "Begampur, Dindigul",
                  "postalCode": "624002",
                  "addressCountry": "IN"
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                    "opens": "05:30",
                    "closes": "21:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Sunday"],
                    "opens": "05:30",
                    "closes": "10:00"
                  }
                ],
                "founder": {
                  "@type": "Person",
                  "name": "Master Rajkumar"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ExerciseGym",
                "name": "Muscle Fitness Studio Unisex, Trichy Road",
                "image": "https://muscle-gym-dindigul.vercel.app/logo.png",
                "telephone": "+919944579994",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sakthi Complex, D-Mart Opposite, Trichy Bypass Service Road",
                  "addressLocality": "Dindigul",
                  "addressCountry": "IN"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ExerciseGym",
                "name": "Muscle Pro Fitness Studio Unisex, Palani Road",
                "image": "https://muscle-gym-dindigul.vercel.app/logo.png",
                "telephone": "+919600578808",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "St Joseph Furniture Building, 1st Floor, Opposite Income Tax Office, Palani Road",
                  "addressLocality": "Dindigul",
                  "addressCountry": "IN"
                }
              }
            ])
          }}
        />
        <LoadingScreen />
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20">{children}</main>
        <Footer />
        {/* Floating social buttons — visible on all pages */}
        <SocialFloat />
      </body>
    </html>
  );
}
