/**
 * @file Declares Follows data type representing relationship between
 * users and users they follow, as in user follows another user
 */
import User from "./User";

/**
 * @typedef Follows Represents likes relationship between a user and users they follow,
 * as in a user follows another user
 * @property {User} followedBy User following a user
 * @property {User} following User being followed by followedBy
 */

export default interface Follows {
    followedBy:User
    following: User
};