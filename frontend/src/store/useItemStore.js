import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; 
import simulate from "@/components/ui/Simulate";


const useItemStore = create((set,get) => ({
  searchedItem: [],
  loading: false,
  error: null,

  // Fetch all items
  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/fetch/items");
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
      const response = await axiosInstance.post("/api/import/items", newItems);
      await get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }
  },



  simulateItem: async (itemData) => {

    // item data = numOfDays, toTimestamp, itemsToBeUsedPerDay 
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(`/simulate/items/`,itemData);
      await get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    } 
  },



  placementRecommendations: async (data) => {
    set({ loading: true, error: null });
    try {
      // data=  items, containers
      const response = await axiosInstance.post("/placement", data);
      get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }
  },

  search: async (query) => {
    set({ loading: true, error: null });
    try {
      query = {
        itemId: query.itemId || null,
        itemName: query.itemName || null,
      };
      const response = await axiosInstance.get(`/search?query=${query}`);
      set({ searchedItem: response.data.items, loading: false });
      get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }
  },
  
  retrieve: async (itemId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/retrieve", { itemId });
      get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
    finally {
      set({ loading: false });
    }
  },


}));

export default useItemStore;