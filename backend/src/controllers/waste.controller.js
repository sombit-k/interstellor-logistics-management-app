import WasteItem from "../models/waste.model.js";
import Item from "../models/item.model.js";

export const identifyWaste = async (req, res) => {
  try {
    const wasteItems = await WasteItem.find();
    res.status(200).json({
      success: true,
      wasteItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const returnPlan = async (req, res) => {
  try {
    const { undockingContainerId, undockingDate, maxWeight } = req.body;
    const items = await Item.find(); // Fetch all items from the Item model

    let totalWeight = 0;
    let totalVolume = 0;
    const returnPlan = [];
    const retrievalSteps = [];
    const returnItems = [];

    items.forEach((item, index) => {
      const itemVolume = item.dimensions.width * item.dimensions.depth * item.dimensions.height; // Calculate volume

      if (totalWeight + item.mass <= maxWeight) {
        totalWeight += item.mass;
        totalVolume += itemVolume;
        returnPlan.push({
          step: index + 1,
          itemId: item.itemId,
          itemName: item.name,
          fromContainer: item.preferredZone, // Assuming preferredZone is the container
          toContainer: undockingContainerId,
        });
        retrievalSteps.push({
          step: index + 1,
          action: "retrieve",
          itemId: item.itemId,
          itemName: item.name,
        });
        returnItems.push({
          itemId: item.itemId,
          name: item.name,
          reason: "N/A", // Reason is not available in the Item model
        });
      }
    });

    res.status(200).json({
      success: true,
      returnPlan,
      retrievalSteps,
      returnManifest: {
        undockingContainerId,
        undockingDate,
        returnItems,
        totalVolume, // Return calculated volume
        totalWeight,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const completeUndocking = async (req, res) => {
  try {
    const { undockingContainerId, timestamp } = req.body;
    const result = await WasteItem.deleteMany({ markedForDisposal: true });
    res.status(200).json({
      success: true,
      itemsRemoved: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const trackWaste = async (req, res) => {
  try {
    const { itemId, name, reason, containerId, position, mass } = req.body;
    const wasteItem = new WasteItem({ itemId, name, reason, containerId, position, mass });
    await wasteItem.save();
    res.status(201).json({ message: "Waste item tracked successfully", wasteItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
