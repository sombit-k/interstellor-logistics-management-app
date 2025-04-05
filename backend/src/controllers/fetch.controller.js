import Item from "../models/item.model.js";
import Log from "../models/log.model.js"; // Ensure the Log model is correctly imported
import WasteItem from "../models/waste.model.js"; // Ensure the WasteItem model is correctly imported

export const fetchAllItems = async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from the database
    res.send({
        items
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message,
    });
  }
};

export const fetchAllLogs = async (req, res) => {
  try {
    const logs = await Log.find(); // Fetch all logs from the database
    res.send({
      logs,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
      error: error.message,
    });
  }
};

export const fetchAllWaste = async (req, res) => {
  try {
    const wasteItems = await WasteItem.find(); // Fetch all waste items from the database
    res.send({
      wasteItems,
    });
  } catch (error) {
    console.error("Error fetching waste items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch waste items",
      error: error.message,
    });
  }
};
