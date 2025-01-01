import mongoose, { model } from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"]
        },
        isCompleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Todos", todoSchema)