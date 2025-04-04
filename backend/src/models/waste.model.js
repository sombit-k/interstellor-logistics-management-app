import mongoose from "mongoose";
const wasteItemSchema = new mongoose.Schema({
    itemId: { 
    type: String, 
    required: true },
    name: { 
    type: String,
     required: true 
    },
    reason: { type: String, 
    enum: ['Expired', 'Outof Uses'], 
    required: true 
    },
    containerId: { 
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
},
    mass: { type: Number, required: true }, // Add mass for weight calculations
    markedForDisposal: { type: Boolean, default: false } // Track disposal status
});

const WasteItem=mongoose.model("WasteItem",wasteItemSchema)

export default WasteItem
