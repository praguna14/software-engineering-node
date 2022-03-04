/**
 * @file Implements mongoose model to CRUD
 * documents in the Tuit collection
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;