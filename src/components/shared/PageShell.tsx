import { ReactNode } from "react";
import PageAtmosphere from "./PageAtmosphere";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  atmosphere?: "light" | "dark" | "minimal";
  showBlobs?: boolean;
};

export default function PageShell({
  children,
  className = "",
  atmosphere = "light",
  showBlobs = true,
}: PageShellProps) {
  return (
    <main className={`relative min-h-screen ${className}`}>
      <PageAtmosphere
        variant={atmosphere}
        showBlobs={showBlobs}
      />

      <div className="relative z-10">{children}</div>
    </main>
  );
}