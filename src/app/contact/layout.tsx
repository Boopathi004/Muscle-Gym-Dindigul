import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Muscle Gym Dindigul",
  description: "Get in touch with Muscle Gym Dindigul. Call, WhatsApp, or visit any of our 3 branches. Membership and personal training enquiries welcome.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
