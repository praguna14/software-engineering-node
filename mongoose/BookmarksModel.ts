/**
 * @file Implements mongoose model to CRUD
 * documents in the Bookmarks collection
 */
import mongoose from "mongoose";
import BookmarksSchema from "./BookmarksSchema";
const BookmarksModel = mongoose.model("BookmarksModel",BookmarksSchema);
export default BookmarksModel;