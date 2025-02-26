// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   onlineUsers: [],
//   socket: null,

//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       set({ authUser: res.data });
//     } catch (error) {
//       console.error(error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signUp: async (data) => {
//     try {
//       set({ isSigningUp: true });
//       const res = await axiosInstance.post("/auth/sign-up", data);
//       toast.success("Account Created Successfully");
//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to create account");
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.get("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       get().disconnectSocket();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to log out");
//     }
//   },

//   login: async (data) => {
//     try {
//       set({ isLoggingIn: true });
//       const res = await axiosInstance.post("/auth/sign-in", data);
//       if (res.data.msg) {
//         return toast.error(res.data.msg);
//       }
//       toast.success("Login Successfully");
//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to login");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("error in update profile:", error);
//       toast.error("Failed to update the profile");
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

//   connectSocket: () => {
//     const { authUser } = get();
//     if (!authUser || get().socket?.connected) return;
//     console.log("in connect socket function userId: ", authUser._id);
//     const socket = io("http://localhost:3000", {
//       query: {
//         userId: authUser._id,
//       },
//     });
//     socket.connect();
//     set({ socket });

//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },
//   disconnectSocket: () => {
//     const { socket } = get();
//     if (!socket) return;
//     socket.disconnect();
//     console.log("disconnected");
//     set({ socket: null });
//   },
// }));
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      // Connect socket if user is authenticated
      if (res.data) {
        get().connectSocket();
      }
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
      get().connectSocket();
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
      set({ authUser: null, onlineUsers: [] }); // Clear onlineUsers state
      toast.success("Logged out successfully");
      get().disconnectSocket();
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
      get().connectSocket();
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error("Failed to update the profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return; // Avoid reconnecting if already connected

    console.log("Connecting socket for userId: ", authUser._id);
    const newSocket = io("http://localhost:3000", {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      // Implement retry logic if needed
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;

    socket.disconnect();
    console.log("Socket disconnected");
    set({ socket: null, onlineUsers: [] }); // Clear socket and onlineUsers state
  },
}));
