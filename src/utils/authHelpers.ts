import { parseCookies } from "nookies";

export const isLoggedIn = (): boolean => {
  const cookies = parseCookies();
  return !!cookies.api_token;
};

export const isAdmin = (): boolean => {
  const cookies = parseCookies();
  return cookies.is_admin === "true";
};
