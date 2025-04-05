import Container from "../models/container.model.js";
import Item from "../models/item.model.js";
import Log from "../models/log.model.js";

export const placeItem = async (req, res) => {
    const { itemId, userId, timestamp, containerId, position } = req.body;

    try {
        // Validate item existence
        const item = await Item.findOne({ itemId });
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        // Validate container existence
        const container = await Container.findOne({ containerId });
        if (!container) {
            return res.status(404).json({ success: false, message: "Container not found" });
        }

        // Check if the item fits in the container
        const { startCoordinates, endCoordinates } = position;
        const itemWidth = endCoordinates.width - startCoordinates.width;
        const itemDepth = endCoordinates.depth - startCoordinates.depth;
        const itemHeight = endCoordinates.height - startCoordinates.height;

        if (
            itemWidth > container.width ||
            itemDepth > container.depth ||
            itemHeight > container.height
        ) {
            return res.status(400).json({ success: false, message: "Item does not fit in the container" });
        }

        // Adjust position for high-priority items
        if (item.priority > 80) { // High-priority items
            position.startCoordinates.depth = 0; // Place closer to the front for easy access
            position.endCoordinates.depth = itemDepth;
        }

        // Update item's position and container
        item.containerId = containerId;
        item.position = position;
        await item.save();

        // Log the placement action
        await Log.create({
            timeStamp: timestamp,
            userId,
            actionType: "placement",
            itemId,
            details: {
                toContainer: containerId,
                position,
            },
        });

        res.status(200).json({ success: true, message: "Item placed successfully" });
    } catch (error) {
        console.error("Error placing item:", error);
        res.status(500).json({ success: false, message: "Failed to place item", error: error.message });
    }
};

export const placementRecommendations = async (req, res) => {
    const { items, containers } = req.body;

    try {
        const placements = [];
        const rearrangements = [];

        items.forEach((item, index) => {
            const container = containers.find(c => c.zone === item.preferredZone && 
                c.width >= item.width && c.depth >= item.depth && c.height >= item.height);

            if (container) {
                const position = {
                    startCoordinates: { width: 0, depth: 0, height: 0 },
                    endCoordinates: { width: item.width, depth: item.depth, height: item.height }
                };

                placements.push({
                    itemId: item.itemId,
                    containerId: container.containerId,
                    position
                });
            } else {
                rearrangements.push({
                    step: index + 1,
                    action: "remove",
                    itemId: item.itemId,
                    fromContainer: "N/A",
                    fromPosition: null,
                    toContainer: "N/A",
                    toPosition: null
                });
            }
        });

        res.status(200).json({ success: true, placements, rearrangements });
    } catch (error) {
        console.error("Error generating placement recommendations:", error);
        res.status(500).json({ success: false, message: "Failed to generate placement recommendations", error: error.message });
    }
};

export const search = async (req, res) => {
    const { itemId, itemName } = req.query;

    try {
        const query = itemId ? { itemId } : { name: itemName };
        const item = await Item.findOne(query);

        if (!item) {
            return res.status(404).json({ success: false, found: false, message: "Item not found" });
        }

        const retrievalSteps = [
            {
                step: 1,
                action: "retrieve",
                itemId: item.itemId,
                itemName: item.name
            }
        ];

        res.status(200).json({
            success: true,
            found: true,
            item: {
                itemId: item.itemId,
                name: item.name,
                containerId: item.containerId,
                zone: item.preferredZone,
                position: item.position
            },
            retrievalSteps
        });
    } catch (error) {
        console.error("Error searching for item:", error);
        res.status(500).json({ success: false, message: "Failed to search for item", error: error.message });
    }
};

export const retrieve = async (req, res) => {
    const { itemId, userId, timestamp } = req.body;

    try {
        const item = await Item.findOne({ itemId });
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        const containerId = item.containerId;
        item.containerId = null;
        item.position = null;
        await item.save();

        await Log.create({
            timeStamp: timestamp,
            userId,
            actionType: "retrieval",
            itemId,
            details: { fromContainer: containerId }
        });

        res.status(200).json({ success: true, message: "Item retrieved successfully" });
    } catch (error) {
        console.error("Error retrieving item:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve item", error: error.message });
    }
};

export const place = async (req, res) => {
    const { itemId, userId, timestamp, containerId, position } = req.body;

    try {
        const item = await Item.findOne({ itemId });
        const container = await Container.findOne({ containerId });

        if (!item || !container) {
            return res.status(404).json({ success: false, message: "Item or container not found" });
        }

        item.containerId = containerId;
        item.position = position;
        await item.save();

        await Log.create({
            timeStamp: timestamp,
            userId,
            actionType: "placement",
            itemId,
            details: { toContainer: containerId, position }
        });

        res.status(200).json({ success: true, message: "Item placed successfully" });
    } catch (error) {
        console.error("Error placing item:", error);
        res.status(500).json({ success: false, message: "Failed to place item", error: error.message });
    }
};

const placement = async (req, res) => {
    const { containerId } = req.body;

    try {
        // Fetch all items in the specified container
        const items = await Item.find({ containerId });
        res.status(200).json({ success: true, items });
    } catch (error) {
        console.error("Error fetching placement data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch placement data", error: error.message });
    }
};


