/**
 * @file Defines the User datatype that represents a user of the platform
 */
import User from "./User";

/**
 * @typedef Tuit Reprsents a user of the platform
 * @property {string} tuit: content of the tuit
 * @property {Date} postedOn: Date when tuit was posted
 * @property {User} postedBy: User who posted the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

