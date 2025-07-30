import { FC, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AdminAuthProps {
  children: ReactNode; // Accepts child components
}

const AdminAuth: FC<AdminAuthProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        toast.warn("To access admin page, please login first.", { autoClose: 8000 });
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/verifyAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!data.success) {
          toast.warn("Insufficient privileges.");
          navigate("/");
          return;
        }

        setIsAuthenticated(true);
      } catch (err) {
        console.error("User verification failed:", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading state while verifying
  }

  return <>{children}</>; // Render children once authenticated
};

export default AdminAuth;
