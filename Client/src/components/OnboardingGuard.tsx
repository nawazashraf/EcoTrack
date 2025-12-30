import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

const OnboardingGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  // HACKATHON FIX: Just check if they are logged in. 
  // We skip the 'onBoardingCompleted' check to avoid getting stuck.
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default OnboardingGuard;