export const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  children: "/children",
  childDetail: (id: string) => `/children/${id}`,
} as const;
