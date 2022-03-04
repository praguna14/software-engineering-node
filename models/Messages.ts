/**
 * @file Declares Messages datatype representing messages sent from one user
 * to another.
 */
import User from "./User";

/**
 * @typedef Messages Represents messages sent from one user to another
 * @property {string} message content of the message
 * @property {User} to user to whom the message will be sent
 * @property {User} from user sending the message
 * @property {Date} sentOn Date of sending the message
 */
export default interface Messages{
    message:string,
    to:User,
    from:User,
    sentOn:Date
}