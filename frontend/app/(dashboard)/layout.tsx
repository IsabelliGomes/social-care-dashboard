import { LateralBar, BottomBar } from "@/components/layout";
import { AuthGuard } from "@/components/auth";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className={styles.shell}>
        <LateralBar />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <BottomBar />
      </div>
    </AuthGuard>
  );
}
