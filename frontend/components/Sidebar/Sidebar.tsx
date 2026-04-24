"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { routes } from "@/lib/routes";
import styles from "./Sidebar.module.scss";

const navItems = [
  { label: "Dashboard", href: routes.dashboard, icon: LayoutDashboard },
  { label: "Crianças", href: "/children", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push(routes.home);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src="/logo-social-care.png"
          alt="Cuidado Social"
          width={120}
          height={40}
          priority
        />
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        <ul className={styles.navList}>
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.navItem} ${pathname === href ? styles.navItemActive : ""}`}
                aria-current={pathname === href ? "page" : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          aria-label="Sair da aplicação"
        >
          <LogOut size={18} aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
