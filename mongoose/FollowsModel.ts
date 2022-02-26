import mongoose from "mongoose";
import FollowsSchema from "./FollowsSchema";
const FollowsModel = mongoose.model("FollowsModel",FollowsSchema);
export default FollowsModel;