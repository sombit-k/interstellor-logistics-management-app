import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        timestamp: { 
            type: String, 
            required: true 
        },
        userId: { 
            type: String, 
            required: true 
        },
        actionType: { 
            type: String, 
            required: true 
        },
        itemId: { 
            type: String, 
            required: true 
        },
        details: {
            fromContainer: { 
                type: String, 
                required: true 
            },
            toContainer: { 
                type: String, 
                required: true 
            },
            reason: { 
                type: String, 
                required: true 
            }
        }
});

const Log=mongoose.model("Log",logSchema)

export default Log