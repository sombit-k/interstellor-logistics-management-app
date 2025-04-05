import { create } from "zustand";
import axios from "axios";

const useItemStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  // Fetch all items
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/items");
      set({ items: response.data.items, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new item
  addItem: async (newItem) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/items", newItem);
      set((state) => ({
        items: [...state.items, response.data.item],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing item
  updateItem: async (itemId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/items/${itemId}`, updatedData);
      set((state) => ({
        items: state.items.map((item) =>
          item.itemId === itemId ? response.data.item : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete an item
  deleteItem: async (itemId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/items/${itemId}`);
      set((state) => ({
        items: state.items.filter((item) => item.itemId !== itemId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useItemStore;