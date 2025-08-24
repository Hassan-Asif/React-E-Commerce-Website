import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";

export const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  setToken(token) {
    localStorage.setItem('token', token);
    try {
      const user = jwtDecode(token);
      set({ token, user });
    } catch (e) {
      set({ token, user: null });
    }
  },
  logout() {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  }
}));
