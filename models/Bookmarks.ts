/**
 * @file Declares Bookmarks data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "./Tuit";
import User from "./User";


/**
 * @typedef Like Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */
export default interface Bookmarks {
    bookmarkedTuit:Tuit,
    bookmarkedBy:User
}