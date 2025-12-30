import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [department, setDepartment] = useState("");
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) return null;
  if (!user) return null;

  // If already onboarded → skip
  if (user.publicMetadata?.onBoardingCompleted) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clerkUserId", user.id);
    formData.append(
      "name",
      user.username ||
        user.emailAddresses[0].emailAddress.split("@")[0]
    );
    formData.append("email", user.emailAddresses[0].emailAddress);
    formData.append("organizationName", "test-org");
    formData.append("department", department);
    formData.append("branch", "test-branch");

    //!Remove url for deployment
    const res = await fetch("http://localhost:5000/api/create-user", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    await user.reload();
    navigate("/", { replace: true });
  };

  // Snow animation
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
      <div className="absolute inset-0 pointer-events-none z-20">
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
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* LEFT */}
      <div className="hidden md:flex bg-emerald-800 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-3">Get Started</h1>
          <p>Select your department to continue carbon tracking.</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Choose Department
          </h2>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full mb-6 px-4 py-3 border rounded-lg"
          >
            <option value="">Select Department</option>
            <option>Electricity</option>
            <option>Transport</option>
            <option>Waste</option>
            <option>Manufacturing</option>
          </select>

          <button
            type="submit"
            disabled={!department}
            className={`w-full py-3 rounded-lg font-semibold ${
              department
                ? "bg-emerald-600 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
