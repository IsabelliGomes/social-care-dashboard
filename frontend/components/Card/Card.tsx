import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};
