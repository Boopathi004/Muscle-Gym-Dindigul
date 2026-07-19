import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Gym Facilities & Equipment | Muscle Gym Dindigul",
  description: "Imported equipment, AC floors, steam rooms, and dedicated workout zones across our 3 branches in Dindigul.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
