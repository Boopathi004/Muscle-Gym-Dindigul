import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Programs - Weight Loss, Bodybuilding & Powerlifting | Muscle Gym Dindigul",
  description: "Explore our fat loss, muscle gain, powerlifting, and general fitness programs across 3 Dindigul branches. Personal coaching included.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
