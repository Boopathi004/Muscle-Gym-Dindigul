import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Muscle Gym Dindigul | Memberships",
  description: "Sign up for a membership at Muscle Gym Dindigul. Select your branch and fitness plan to get started today.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
