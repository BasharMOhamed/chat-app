import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
      //   console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Can't get the users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (id) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get("/message/" + id);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to get the Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        "/message/send/" + selectedUser._id,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send the message");
    }
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
