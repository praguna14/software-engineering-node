import mongoose from "mongoose";
import MessagesSchema from "./MessagesSchema";
const MessagesModel = mongoose.model("MessagesModel",MessagesSchema);
export default MessagesModel;