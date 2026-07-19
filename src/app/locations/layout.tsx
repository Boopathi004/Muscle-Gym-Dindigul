import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our 3 Branches in Dindigul | Muscle Gym Dindigul",
  description: "Find Muscle Gym Dindigul at Begampur, Trichy Bypass Road, and Palani Road. Timings, addresses, and directions for all 3 branches.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
