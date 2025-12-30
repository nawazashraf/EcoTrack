import { useEffect, useState } from "react";
import { SignIn } from "@clerk/clerk-react";

const LogIn = () => {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 5,
      size: Math.random() * 12 + 8,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute"
            style={{
              left: `${flake.left}%`,
              top: "-20px",
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `fall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
              textShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>

      <div className="hidden md:flex bg-linear-to-br from-emerald-700 to-green-900 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-3">EcoTrack</h1>
          <p className="text-lg opacity-90 max-w-md">
            Track, analyze, and reduce your carbon footprint with confidence.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#EDF8FC] relative">
        <div className="relative z-10">
          <SignIn
            redirectUrl="/"
            appearance={{
              elements: {
                card: "shadow-none bg-transparent border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                footer: "hidden",
                formButtonPrimary:
                  "bg-green-600 hover:bg-green-700 text-white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
