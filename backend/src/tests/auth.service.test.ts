import { authenticateUser, verifyToken } from "../services/auth.service";

describe("auth service", () => {
  describe("authenticateUser", () => {
    test("returns a token when credentials are valid", () => {
      const validEmail = "tecnico@prefeitura.rio";
      const validPassword = "painel@2024";

      const token = authenticateUser(validEmail, validPassword);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token).not.toBeNull();
    });

    test("returns null when email is invalid", () => {
      const invalidEmail = "wrong@example.com";
      const validPassword = "painel@2024";

      const token = authenticateUser(invalidEmail, validPassword);

      expect(token).toBeNull();
    });

    test("returns null when password is invalid", () => {
      const validEmail = "tecnico@prefeitura.rio";
      const invalidPassword = "wrong-password";

      const token = authenticateUser(validEmail, invalidPassword);

      expect(token).toBeNull();
    });

    test("returns null when both email and password are invalid", () => {
      const invalidEmail = "wrong@example.com";
      const invalidPassword = "wrong-password";

      const token = authenticateUser(invalidEmail, invalidPassword);

      expect(token).toBeNull();
    });
  });

  describe("verifyToken", () => {
    test("returns payload when token is valid", () => {
      const validEmail = "tecnico@prefeitura.rio";
      const validPassword = "painel@2024";

      const token = authenticateUser(validEmail, validPassword);

      if (!token) {
        throw new Error("Token should not be null");
      }

      const payload = verifyToken(token);

      expect(payload).toBeDefined();
      expect(payload?.preferred_username).toBe(validEmail);
    });

    test("returns null when token is invalid", () => {
      const invalidToken = "invalid.token.here";

      const payload = verifyToken(invalidToken);

      expect(payload).toBeNull();
    });

    test("returns null when token is malformed", () => {
      const malformedToken = "not-a-valid-jwt";

      const payload = verifyToken(malformedToken);

      expect(payload).toBeNull();
    });
  });
});
