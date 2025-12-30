import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

const OnboardingGuard = ({ children }: { children: JSX.Element }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!user?.publicMetadata?.onBoardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default OnboardingGuard;
