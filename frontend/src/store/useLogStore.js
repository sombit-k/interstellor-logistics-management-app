import { create } from "zustand";
import axios from "axios";

const useLogStore = create((set) => ({
  logs: [],
  loading: false,
  error: null,

  // Fetch all logs
  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/logs");
      set({ logs: response.data.logs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new log
  addLog: async (newLog) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/logs", newLog);
      set((state) => ({
        logs: [...state.logs, response.data.log],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing log
  updateLog: async (logId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/logs/${logId}`, updatedData);
      set((state) => ({
        logs: state.logs.map((log) =>
          log.id === logId ? response.data.log : log
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a log
  deleteLog: async (logId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/logs/${logId}`);
      set((state) => ({
        logs: state.logs.filter((log) => log.id !== logId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useLogStore;