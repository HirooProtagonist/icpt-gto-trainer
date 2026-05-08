import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { create } from "zustand";

interface AuthStore {
  isGuest: boolean;
  setGuest: (v: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isGuest: false,
  setGuest: (v) => set({ isGuest: v }),
}));

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity !== undefined;
  const isLoading = loginStatus === "logging-in";
  const principalId = identity?.getPrincipal()?.toString();

  return {
    identity,
    loginStatus,
    isAuthenticated,
    // Aliases for backward compatibility with older pages
    isLoggedIn: isAuthenticated,
    isGuest: !isAuthenticated,
    isLoading,
    principalId,
    login,
    logout: clear,
    clear,
  };
}
