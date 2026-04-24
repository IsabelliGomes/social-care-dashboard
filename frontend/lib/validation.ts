export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.trim().length > 0;
};

export const validateLoginForm = (
  email: string,
  password: string
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = "E-mail é obrigatório";
  } else if (!validateEmail(email)) {
    errors.email = "E-mail inválido";
  }

  if (!password) {
    errors.password = "Senha é obrigatória";
  } else if (!validatePassword(password)) {
    errors.password = "Senha inválida";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
