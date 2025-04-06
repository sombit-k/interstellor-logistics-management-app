import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { saveAs } from "file-saver"; // For saving files in the browser
import { Parser } from "json2csv"; // For converting JSON to CSV

const useItemStore = create((set, get) => ({
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
    } finally {
      set({ loading: false });
    }
  },

  // Add a new item
  importItem: async (newItems) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/api/import/items", newItems);
      await get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  simulateItem: async (itemData) => {
    // item data = numOfDays, toTimestamp, itemsToBeUsedPerDay 
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(`/simulate/items/`, itemData);
      await get().fetchItems();
    } catch (error) {
      set({ error: error.message, loading: false });
    } finally {
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
    } finally {
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
    } finally {
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
    } finally {
      set({ loading: false });
    }
  },

  // Export items to CSV
  exportItemsToCSV: async () => {
    set({ loading: true, error: null });
    try {
      const items = get().items || [];
      if (items.length === 0) {
        throw new Error("No items available to export.");
      }

      // Define fields for the CSV
      const fields = [
        { label: "Item ID", value: "itemId" },
        { label: "Name", value: "name" },
        { label: "Width (cm)", value: "dimensions.width" },
        { label: "Depth (cm)", value: "dimensions.depth" },
        { label: "Height (cm)", value: "dimensions.height" },
        { label: "Mass (kg)", value: "mass" },
        { label: "Priority", value: "priority" },
        { label: "Expiry Date", value: "expiryDate" },
        { label: "Usage Limit", value: "usageLimit" },
        { label: "Preferred Zone", value: "preferredZone" },
      ];

      // Convert JSON to CSV
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(items);

      // Save the CSV file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "items.csv");

      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useItemStore;