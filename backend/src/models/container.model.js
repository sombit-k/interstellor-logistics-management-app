import mongoose from "mongoose";

const containerSchema = new mongoose.Schema({
    zone: {
        type: String,
        required: true
    },
    containerId: {
        type: String,
        required: true,
        unique: true
    },
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
});

const Container=mongoose.model("Container",containerSchema)
export default Container