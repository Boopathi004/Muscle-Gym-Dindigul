import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gym Gallery & Interior | Muscle Gym Dindigul",
  description: "View our spacious workout zones, imported machines, and training floors at Muscle Gym Dindigul.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
