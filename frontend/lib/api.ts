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

export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Only these requests may run without a valid JWT (login). */
function allowsUnauthenticatedRequest(
  endpoint: string,
  options: RequestInit
): boolean {
  const method = (options.method ?? "GET").toUpperCase();
  const path = endpoint.split("?")[0];
  return method === "POST" && path === "/auth/token";
}

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const needsAuth = !allowsUnauthenticatedRequest(endpoint, options);

  if (needsAuth && typeof window !== "undefined") {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
      clearToken();
      window.location.replace("/");
      throw new Error("Não autenticado");
    }
  }

  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    window.location.replace("/");
    throw new Error("Session expired");
  }

  return response;
};

export const getSummary = async (): Promise<import("@/types").SummaryResponse> => {
  const response = await apiCall("/summary");

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
};

export const getChildren = async (
  page = 1,
  pageSize = 5,
  filters: { bairro?: string; comAlertas?: string; revisado?: string } = {}
): Promise<import("@/types").ListChildrenResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (filters.bairro) params.set("bairro", filters.bairro);
  if (filters.comAlertas) params.set("comAlertas", filters.comAlertas);
  if (filters.revisado) params.set("revisado", filters.revisado);

  const response = await apiCall(`/children?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch children");
  }

  return response.json();
};

export const getChildById = async (
  id: string
): Promise<import("@/types").Child> => {
  const response = await apiCall(`/children/${id}`);

  if (!response.ok) {
    throw new Error("Child not found");
  }

  return response.json();
};

export const reviewChild = async (
  id: string
): Promise<import("@/types").Child> => {
  const response = await apiCall(`/children/${id}/review`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to review child");
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
