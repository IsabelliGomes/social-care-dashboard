const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const clearToken = (): void => {
  localStorage.removeItem("auth_token");
};

export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

export const getSummary = async (): Promise<import("@/types").SummaryResponse> => {
  const response = await apiCall("/summary");

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
};

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const response = await apiCall("/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};
