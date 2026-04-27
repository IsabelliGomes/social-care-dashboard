"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import styles from "./TopBar.module.scss";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email ?? null;
  } catch {
    return null;
  }
}

export function TopBar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getUserEmail());
  }, []);

  const greeting = getGreeting();
  const displayName = email ? email.split("@")[0] : "técnico";

  return (
    <header className={styles.topbar}>
      <div className={styles.greeting}>
        <p className={styles.greetingText}>
          {greeting},{" "}
          <span className={styles.greetingName}>{displayName}</span>
        </p>
        <p className={styles.greetingSubtitle}>
          Painel de Acompanhamento de Crianças
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.notificationButton}
          aria-label="Notificações"
        >
          <Bell size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
