import { Sidebar, BottomBar } from "@/components/layout";
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
        <Sidebar />
        <div className={styles.main}>
          {children}
        </div>
        <BottomBar />
      </div>
    </AuthGuard>
  );
}
