import { useState } from "react";
import React from "react";

const Onboarding = () => {
  const [department, setDepartment] = useState("");
  const [snowflakes, setSnowflakes] = useState([]);

  React.useEffect(() => {
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 5,
      size: Math.random() * 12 + 8,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setSnowflakes(flakes);
  }, []);

  const handleContinue = () => {
    alert(`Navigating to upload page with department: ${department}`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Snowflake Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute"
            style={{
              left: `${flake.left}%`,
              top: '-20px',
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `fall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
              textShadow: '0 0 5px rgba(255, 255, 255, 0.8)'
            }}
          >
            ❄
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
      
      {/* LEFT 50% INFO */}
      <div className="hidden md:flex bg-emerald-800 text-white items-center justify-center p-10 relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Get Started</h1>
          <p className="opacity-90">
            Select your department to continue carbon tracking.
          </p>
        </div>
      </div>

      {/* RIGHT 50% FORM */}
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white relative">
        {/* Frost overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, rgba(191, 219, 254, 0.2), transparent 70%)'
          }}
        />
        
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md relative z-10 border border-blue-100">
          {/* Inner frost effect */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none" 
            style={{
              background: 'radial-gradient(circle at top right, rgba(191, 219, 254, 0.15), transparent 60%), radial-gradient(circle at bottom left, rgba(165, 243, 252, 0.15), transparent 60%)',
              boxShadow: 'inset 0 0 40px rgba(191, 219, 254, 0.1)'
            }}
          />
          
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 relative z-10">
            Choose Department
          </h2>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white relative z-10"
          >
            <option value="">Select Department</option>
            <option>Electricity</option>
            <option>Transport</option>
            <option>Waste</option>
            <option>Manufacturing</option>
          </select>

          <button
            disabled={!department}
            onClick={handleContinue}
            className={`w-full py-3 rounded-lg font-semibold transition-all relative z-10 ${
              department
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;