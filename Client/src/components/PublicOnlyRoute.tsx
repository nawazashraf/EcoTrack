import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
