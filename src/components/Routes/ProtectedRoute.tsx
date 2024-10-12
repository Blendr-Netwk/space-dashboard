import { useUser } from "@/providers/UserProvider";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, status } = useUser();

  useEffect(() => {
    if (status === "failed") {
      window.location.href = "/login";
    }
  }, [status]);

  if (!isAuthenticated) {
    return <div>Loading..</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
