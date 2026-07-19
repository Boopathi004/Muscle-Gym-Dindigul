import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Transformations & Results | Muscle Gym Dindigul",
  description: "Real weight loss and muscle gain results from our members at Muscle Gym Dindigul.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
