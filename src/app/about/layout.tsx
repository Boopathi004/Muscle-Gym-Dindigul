import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Master Rajkumar | Muscle Gym Dindigul",
  description: "Meet Master Rajkumar, 18+ years bodybuilding coach behind Muscle Gym Dindigul. Learn our training philosophy and coaching approach.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
