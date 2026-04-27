"use client";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, setToken } from "@/lib/api";
import { validateLoginForm } from "@/lib/validation";
import { InputField, Button, Card } from "@/components/ui";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    const validation = validateLoginForm(email, password);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);
      setToken(data.token);
      router.push("/dashboard");
    } catch (err) {
      setServerError("Credenciais inválidas. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={styles["login-form__card"]}>
      <div className={styles["login-form__header"]}>
        <h1 className={styles["login-form__title"]}>Cuidado Social</h1>
        <p className={styles["login-form__subtitle"]}>
          Painel de Acompanhamento de Crianças
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles["login-form__form"]}>
        <InputField
          label="E-mail"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          disabled={loading}
          placeholder="email@example.com"
          required
        />

        <InputField
          label="Senha"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={loading}
          placeholder="********"
          required
        />

        {serverError && (
          <div className={styles["login-form__error"]} role="alert" aria-live="polite">
            {serverError}
          </div>
        )}

        <Button type="submit" disabled={loading} loading={loading} fullWidth>
          Entrar
        </Button>
      </form>
    </Card>
  );
};
