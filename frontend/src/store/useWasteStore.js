import { create } from "zustand";
import axios from "axios";

const useWasteStore = create((set) => ({
  wasteItems: [],
  loading: false,
  error: null,

  // Fetch all waste items
  fetchWasteItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/waste");
      set({ wasteItems: response.data.wasteItems, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new waste item
  addWasteItem: async (newWasteItem) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/waste", newWasteItem);
      set((state) => ({
        wasteItems: [...state.wasteItems, response.data.wasteItem],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing waste item
  updateWasteItem: async (wasteId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/waste/${wasteId}`, updatedData);
      set((state) => ({
        wasteItems: state.wasteItems.map((item) =>
          item.id === wasteId ? response.data.wasteItem : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a waste item
  deleteWasteItem: async (wasteId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/waste/${wasteId}`);
      set((state) => ({
        wasteItems: state.wasteItems.filter((item) => item.id !== wasteId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWasteStore;