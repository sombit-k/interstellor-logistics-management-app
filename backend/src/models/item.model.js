import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemId: { 
            type: String, 
            required: true, 
            unique: true 
        },
        containerId: { 
            type: String,
            default: "null",
            unique: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        dimensions: {
            width: { 
                type: Number, 
                required: true 
            },
            depth: { 
                type: Number, 
                required: true 
            },
            height: { 
                type: Number, 
                required: true 
            }
        },
        
        mass: { 
            type: Number, 
            required: true 
        },
        priority: { 
            type: Number, 
            required: true, 
            min: 1, 
            max: 100 
        },
        expiryDate: { 
            type: String, 
            default: "N/A" 
        },
        usageLimit: { 
            type: String, 
            required: true 
        },
        preferredZone: { 
            type: String, 
            required: true 
        },
        position: {
            startCoordinates: {
                width: { type: Number },
                depth: { type: Number },
                height: { type: Number }
            },
            endCoordinates: {
                width: { type: Number },
                depth: { type: Number },
                height: { type: Number }
            }
        }
    }
);

const Item=mongoose.model("Item",itemSchema)

export default Item