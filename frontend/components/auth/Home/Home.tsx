"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { routes } from "@/lib/routes";
import styles from "./Home.module.scss";

export const Home = () => {
  const router = useRouter();

  return (
    <main className={styles.home}>
      <div className={styles.home__content}>
        <Image
          src="/logo-social-care.png"
          alt="Cuidado Social"
          width={720}
          height={480}
          priority
          className="h-100 w-auto"
        />

        <Button
          type="button"
          onClick={() => router.push(routes.login)}
          className={styles.home__button}
        >
          Entrar
        </Button>
      </div>
    </main>
  );
};
