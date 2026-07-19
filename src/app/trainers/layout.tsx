import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Trainers & Coaches | Muscle Gym Dindigul",
  description: "Meet our certified personal trainers at Muscle Gym Dindigul. We specialize in weight loss, strength, and bodybuilding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
