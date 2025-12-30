import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const AuthSync = () => {
  const { user, isSignedIn } = useUser();
  const API_URL = import.meta.env.VITE_API_URL || "https://ecotrack-backend-vkcx.onrender.com";

  useEffect(() => {
    const syncUser = async () => {
      const localToken = localStorage.getItem("token");

      if (isSignedIn && user && !localToken) {
        try {
          const res = await fetch(`${API_URL}/api/auth/clerk-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName,
              clerkId: user.id,
            }),
          });

          const data = await res.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.reload(); 
          }
        } catch (err) {
          console.error("❌ Sync Failed:", err);
        }
      }
    };
    syncUser();
  }, [isSignedIn, user]);

  return null; 
};

export default AuthSync;