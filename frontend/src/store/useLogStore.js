import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";

const useLogStore = create((set) => ({
  logs: [],
  loading: false,
  error: null,

  // Fetch all logs
  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      // { startDate, endDate, itemId, userId, actionType } = req.query;//comes from frontend
      const response = await axiosInstance.get('/logs', {
        params: {
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          endDate: new Date().toISOString(), // now
          itemId: null,
          userId: null,
          actionType: null,
        },
      });
      set({ logs: response.data.logs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }

  },

  // Add a new log
  addLog: async (newLog) => {
    set({ loading: true, error: null });
    try {

    //newLog =  { timeStamp, userId, actionType, itemId, details } 
    
      const response = await axiosInstance.post("/log/item", newLog);
      set((state) => ({
        logs: [...state.logs, response.data.log],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

}));

export default useLogStore;