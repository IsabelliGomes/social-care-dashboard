import { TopBar } from "@/components/TopBar/TopBar";
import styles from "./page.module.scss";

export default function DashboardPage() {
  return (
    <>
      <TopBar />
      <main className={styles.content}>
        <p className={styles.placeholder}>Dashboard em construção...</p>
      </main>
    </>
  );
}
