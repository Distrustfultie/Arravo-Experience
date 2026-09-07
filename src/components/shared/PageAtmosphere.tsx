"use client";

type PageAtmosphereProps = {
  variant?: "light" | "dark" | "minimal";
  showBlobs?: boolean;
};

export default function PageAtmosphere({
  variant = "light",
  showBlobs = true,
}: PageAtmosphereProps) {
  return (
    <div
      aria-hidden="true"
      className={`page-atmosphere page-atmosphere--${variant}`}
    >
      {showBlobs && (
        <>
          <span
            className="ambient-blob ambient-blob--red"
            style={{
              top: "18%",
              right: "12%",
            }}
          />

          <span
            className="ambient-blob ambient-blob--dark"
            style={{
              bottom: "12%",
              left: "8%",
            }}
          />
        </>
      )}
    </div>
  );
}