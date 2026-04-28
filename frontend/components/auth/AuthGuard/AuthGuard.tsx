"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken, clearToken, isTokenValid } from "@/lib/api";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  const revokeAndRedirect = useCallback(() => {
    clearToken();
    setAuthorized(false);
    router.replace("/");
  }, [router]);

  const validateSession = useCallback((): boolean => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
      revokeAndRedirect();
      return false;
    }
    return true;
  }, [revokeAndRedirect]);

  useEffect(() => {
    if (!validateSession()) return;
    setAuthorized(true);
  }, [pathname, validateSession]);

  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState !== "visible") return;
      if (!validateSession()) return;
      setAuthorized(true);
    }

    function onFocus() {
      if (!validateSession()) return;
      setAuthorized(true);
    }

    function onStorage(e: StorageEvent) {
      if (e.key !== "auth_token") return;
      const token = e.newValue;
      if (!token || !isTokenValid(token)) {
        revokeAndRedirect();
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [validateSession, revokeAndRedirect]);

  if (!authorized) return null;

  return <>{children}</>;
};
