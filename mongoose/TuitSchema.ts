/**
 * @file Defines the TuitSchema schema used in models
 */
import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    tuit: { type: String, required: true },
    postedOn: Date,
    postedBy: { type: String },
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
    }
});

export default TuitSchema;