import Container from "../models/container.model.js"
import Item from "../models/item.model.js"
import Log from "../models/log.model.js"
import WasteItem from "../models/waste.model.js"

export const simulateDay = (req, res) => {
    // Function implementation for simulateDay
};

export const simulateItemUsage = async (req, res) => {
    const { numOfDays, toTimestamp, itemsToBeUsedPerDay } = req.body;

    try {
        // Determine the simulation end date
        const startDate = new Date();
        const endDate = toTimestamp ? new Date(toTimestamp) : new Date(startDate.getTime() + numOfDays * 24 * 60 * 60 * 1000);

        const itemsUsed = [];
        const itemsExpired = [];
        const itemsDepletedToday = [];

        for (const item of itemsToBeUsedPerDay) {
            const dbItem = await Item.findOne({ itemId: item.itemId });

            if (!dbItem) continue;

            // Simulate usage
            const remainingUses = parseInt(dbItem.usageLimit) - numOfDays;
            if (remainingUses <= 0) {
                itemsDepletedToday.push({ itemId: dbItem.itemId, name: dbItem.name });
                await WasteItem.create({
                    itemId: dbItem.itemId,
                    name: dbItem.name,
                    reason: "Outof Uses",
                    containerId: "Unknown", // Adjust as needed
                    position: dbItem.position,
                });
                await dbItem.deleteOne();
            } else {
                itemsUsed.push({ itemId: dbItem.itemId, name: dbItem.name, remainingUses });
                dbItem.usageLimit = `${remainingUses} uses`;
                await dbItem.save();
            }

            // Check for expiry
            if (new Date(dbItem.expiryDate) <= endDate) {
                itemsExpired.push({ itemId: dbItem.itemId, name: dbItem.name });
                await WasteItem.create({
                    itemId: dbItem.itemId,
                    name: dbItem.name,
                    reason: "Expired",
                    containerId: "Unknown", // Adjust as needed
                    position: dbItem.position,
                });
                await dbItem.deleteOne();
            }
        }

        res.status(200).json({
            success: true,
            newDate: endDate.toISOString(),
            changes: {
                itemsUsed,
                itemsExpired,
                itemsDepletedToday,
            },
        });
    } catch (error) {
        console.error("Error during simulation:", error);
        res.status(500).json({ success: false, message: "Simulation failed", error });
    }
};



