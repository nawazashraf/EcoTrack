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
      {/* ❄️ Snowflake Effect */}
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

      {/* LEFT SIDE */}
      <div className="hidden md:flex bg-linear-to-br from-emerald-700 to-green-900 text-white items-center justify-center p-10 relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">EcoTrack</h1>
          <p className="text-lg opacity-90 max-w-md">
            Track, analyze, and reduce your carbon footprint with confidence.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE – Clerk Login */}
      <div className="flex items-center justify-center bg-linear-to-br from-blue-50 via-cyan-50 to-white relative">
        {/* Frost overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(191, 219, 254, 0.2), transparent 70%)",
          }}
        />

        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-blue-100">
          {/* Inner frost effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(191, 219, 254, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(165, 243, 252, 0.15), transparent 60%)",
              boxShadow: "inset 0 0 40px rgba(191, 219, 254, 0.1)",
            }}
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 relative z-10">
            Login to your account
          </h2>

          {/* 🔐 REAL AUTH (Clerk) */}
          <SignIn
            fallbackRedirectUrl="/"
            appearance={{
              elements: {
                card: "shadow-none bg-transparent",
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
