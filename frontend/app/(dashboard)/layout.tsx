import { Sidebar } from "@/components/Sidebar/Sidebar";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
