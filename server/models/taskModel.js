import mongoose from "mongoose";
import {Schema} from 'mongoose';



const taskModel = new Schema({
    text: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    }},
    {
    timestamps: true,
})

export default mongoose.model('tasks',taskModel);