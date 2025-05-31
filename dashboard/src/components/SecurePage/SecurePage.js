"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function securePage(Component, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
          setIsAuthenticated(true);
        } else {
          router.push("/"); // ou une page "403"
        }
      } catch (error) {
        console.error("Token invalide", error);
        router.push("/");
      } finally {
        setIsAuthChecked(true);
      }
    }, [router]);

    if (!isAuthChecked) return null;
    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
}