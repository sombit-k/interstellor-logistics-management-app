
import mongoose from "mongoose";
import Item from "../models/item.model.js";

export const  importItems=  async (req, res) => {
    const { items } = req.body;

    let successfulImports=0;
    let unSuccessfulImports=0;
    try {
        for(let item of items){
            console.log(item);
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
            successfulImports++;
        }
    } catch (error) {
        unSuccessfulImports=successfulImports+1;
        // console.error("Error importing items:", error);
        // return res.status(500).json({ message: "Error importing items", error });
    }
    return res.status(200).json({
        "success":true,
        "itemsImported":successfulImports,
        "errors": [
        {
        "row":unSuccessfulImports,
        "message":unSuccessfulImports!=0?"There have been an unsuccessful import":"No issues found"
        },
        ]
        });
}