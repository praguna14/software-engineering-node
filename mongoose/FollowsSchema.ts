import mongoose, {Schema} from "mongoose";
import Follows from "../models/Follows";

const FollowsSchema = new mongoose.Schema<Follows>({
    followedBy:{type:Schema.Types.ObjectId, ref:"UserModel"},
    following:{type:Schema.Types.ObjectId, ref:"UserModel"},
},{collection:"follows"});
export default FollowsSchema;