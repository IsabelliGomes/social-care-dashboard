"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { routes } from "@/lib/routes";
import styles from "./BottomBar.module.scss";

const navItems = [
  { label: "Dashboard", href: routes.dashboard, icon: LayoutDashboard },
  { label: "Crianças", href: "/children", icon: Users },
];

export function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push(routes.home);
  }

  return (
    <nav className={styles.bottombar} aria-label="Navegação mobile">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.navItem} ${pathname === href ? styles.navItemActive : ""}`}
          aria-current={pathname === href ? "page" : undefined}
        >
          <Icon size={22} aria-hidden="true" />
          <span className={styles.navLabel}>{label}</span>
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className={styles.navItem}
        aria-label="Sair da aplicação"
      >
        <LogOut size={22} aria-hidden="true" />
        <span className={styles.navLabel}>Sair</span>
      </button>
    </nav>
  );
}
