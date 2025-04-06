import { create } from "zustand";
import axios from "axios";

const useItemStore = create((set,get) => ({
  items: [],
  loading: false,
  error: null,

  // Fetch all items
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/fetch/items");
      set({ items: response.data.items, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }

  },

  // Add a new item
  importItem: async (newItems) => {
    set({ loading: true, error: null });
    try {
      //import items from csv file
      const response = await axios.post("/api/import/items", newItems);
      await get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
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