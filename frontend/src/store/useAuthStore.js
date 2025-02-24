import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/sign-up", data);
      toast.success("Account Created Successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/sign-in", data);
      if (res.data.msg) {
        return toast.error(res.data.msg);
      }
      toast.success("Login Successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
