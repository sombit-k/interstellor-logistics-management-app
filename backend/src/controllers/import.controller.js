import fs from "fs";
import csvParser from "csv-parser";
import Item from "../models/item.model.js";
import mongoose from "mongoose";
import Item from "../models/item.model.js";
import Container from "../models/container.model.js";

export const importContainers = async (req, res) => {
    const { containers } = req.body;

    let successfulImports=0;
    let unSuccessfulImports=0;
    try {
        for(let container of containers){
            console.log(container);
            const { containerId, name, dimensions, mass, priority, expiryDate, usageLimit, preferredZone } = container;
            const newContainer = new Container({
                zone,
                containerId,
                width,
                depth,
                height
            });
            await newContainer.save();
            successfulImports++;
        }
    } catch (error) {
        unSuccessfulImports=successfulImports+1;
        // console.error("Error importing items:", error);
        // return res.status(500).json({ message: "Error importing items", error });
    }
    return res.status(200).json({
        "success":true,
        "containersImported":successfulImports,
        "errors": [
        {
        "row":unSuccessfulImports,
        "message":unSuccessfulImports!=0?"There have been an unsuccessful import":"No issues found"
        },
        ]
        });
}
// example data structure for reference
// {
//     "containers": [
//         {
//             "zone": "Storage_Bay",
//             "containerId": "C001",
//             "width": 45.2,
//             "depth": 30.5,
//             "height": 25.8
//         },
//         {
//             "zone": "Maintenance_Bay",
//             "containerId": "C002",
//             "width": 50.3,
//             "depth": 35.7,
//             "height": 28.4
//         }
//     ]
// }

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

// example data structure for reference for items. 
// {
    // "items": [
    //     {
    //         "itemId": "000001",
    //         "name": "Research_Samples",
    //         "dimensions": {
    //             "width": 26.8,
    //             "depth": 17.5,
    //             "height": 19.4
    //         },
    //         "mass": 2.4,
    //         "priority": 84,
    //         "expiryDate": "N/A",
    //         "usageLimit": "2304",
    //         "preferredZone": "Storage_Bay"
    //     },
    //     {
    //         "itemId": "000002",
    //         "name": "LED_Work_Light",
    //         "dimensions": {
    //             "width": 49.9,
    //             "depth": 36.3,
    //             "height": 44.2
    //         },
    //         "mass": 40.03,
    //         "priority": 90,
    //         "expiryDate": "N/A",
    //         "usageLimit": "3558",
    //         "preferredZone": "Maintenance_Bay"
    //     }
    // ]
// }