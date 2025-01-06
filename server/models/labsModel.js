import mongoose from "mongoose";
import User from "./userModel.js";

const LabsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    instructor:{
        type: String,
        required: true,
    },
    User: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    }]


});


const Labs = mongoose.model("Labs", LabsSchema);

export default Labs;