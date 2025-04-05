
import mongoose from "mongoose";
import Item from "../models/item.model.js";

export const  importItems=  async (req, res) => {
    const { items } = req.body;
    let rowNumber=0;
    try {
        for(let item in items){
            const { itemId, name, dimensions, mass, priority, expiryDate, usageLimit, preferredZone } = item;
            const newItem = new Item({
                itemId,
                name,
                dimensions,
                mass,
                priority,
                expiryDate,
                usageLimit,
                preferredZone,
                position: {
                    startCoordinates: {
                        width: null,
                        depth: null,
                        height: null
                    },
                    endCoordinates: {
                        width: null,
                        depth: null,
                        height: null
                    }
                }
            });
            await newItem.save();
        }
    } catch (error) {
        console.error("Error importing items:", error);
        return res.status(500).json({ message: "Error importing items", error });
    }
}