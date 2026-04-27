"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, BottomBar } from "@/components/layout";
import { getToken, clearToken } from "@/lib/api";
import styles from "./layout.module.scss";

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
      clearToken();
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        {children}
      </div>
      <BottomBar />
    </div>
  );
}
