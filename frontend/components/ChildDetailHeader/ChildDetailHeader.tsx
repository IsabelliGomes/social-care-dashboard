"use client";

import { ArrowLeft, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Child } from "@/types";
import styles from "./ChildDetailHeader.module.scss";

function calcAge(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

type ChildDetailHeaderProps = {
  child: Child;
};

export function ChildDetailHeader({ child }: ChildDetailHeaderProps) {
  const router = useRouter();
  const age = calcAge(child.data_nascimento);

  return (
    <header className={styles.header}>
      <button
        className={styles.backButton}
        onClick={() => router.back()}
        aria-label="Voltar"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar
      </button>

      <div className={styles.identity}>
        <div className={styles.avatar} aria-hidden="true">
          {child.nome.charAt(0)}
        </div>
        <div className={styles.info}>
          <h1 className={styles.name}>{child.nome}</h1>
          <p className={styles.meta}>
            {formatDate(child.data_nascimento)} · {age} anos
          </p>
          <p className={styles.location}>
            <MapPin size={13} aria-hidden="true" />
            {child.bairro}
          </p>
        </div>
      </div>

      <div className={styles.responsavel}>
        <User size={14} aria-hidden="true" />
        <span>{child.responsavel}</span>
      </div>
    </header>
  );
}
