import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = "1h";

const VALID_EMAIL = "tecnico@prefeitura.rio";
const VALID_PASSWORD = "painel@2024";

export type TokenPayload = {
  preferred_username: string;
};

export const authenticateUser = (
  email: string,
  password: string
): string | null => {
  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    return null;
  }

  const token = jwt.sign(
    { preferred_username: email } as TokenPayload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload;
  } catch {
    return null;
  }
};
