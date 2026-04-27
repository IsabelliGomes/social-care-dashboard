"use client";
import type { ReactNode } from "react";

import styles from "./layout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className={styles["auth-layout"]}>{children}</main>;
}
