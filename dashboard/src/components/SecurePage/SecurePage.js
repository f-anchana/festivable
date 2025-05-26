"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function securePage(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
      setIsAuthChecked(true);
    }, [router]);

    if (!isAuthChecked) {
      // Affiche rien ou un loader pendant la vérification
      return null;
    }

    if (!isAuthenticated) {
      return null; // ou un message
    }

    return <Component {...props} />;
  };
}
