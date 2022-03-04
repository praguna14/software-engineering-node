/**
 * @file interface for Follows DAO
 */
import Follows from "../models/Follows";

/**
 * @interface FollowsDAO defines all the methods that are 
 * required to be implemented by a DAO.
 */
export default interface FollowsDao {
     /**
     * Returns the list of users followed by the given user
     * @param uid user id of the given user
     * @returns {Follows[]} list of follows object 
     */
    findUsersFollowedByUser (uid:string): Promise<Follows[]>;
     /**
     * Returns the list of users following the given user
     * @param uid user id of the given user
     * @returns {Follows[]} list of follows objects
     */
    findUsersFollowingUser(uid:string): Promise<Follows[]>;
     /**
     * Creates a record for Follows resource according to the user ids passed
     * @param uid_cur user id of the user following another user
     * @param uid user id of the user being followed
     * @returns Follow object created
     */
    followsUser(uid_cur:String,uid:string):Promise<any>;
    /**
     * Removes a previously created follows resource.
     * @param uid_cur user id of the user following another user
     * @param uid user id of the user being followed
     * @returns status of unfollowing
     */
    unfollowsUser(uid_cur:String, uid:string):Promise<Follows>;
}