/**
 * @file DAO for Follows resource
 */
import FollowsDaoInterface from "../interfaces/FollowsDao";
import Follows from "../models/Follows";
import FollowsModel from "../mongoose/FollowsModel";

/**
 * @class FollowsDao Implements the required method for accessing 
 * Follows resource fromt the database.
 * 
 * @property {FollowsDao} dao Singleton implemention methods for
 * accessing Follows resources  
 */
export default class FollowsDao implements FollowsDaoInterface {
    private static dao: FollowsDao | null = null;
    /**
     * Returns the instance of FollowsDao. If instance is not present the 
     * first creates the instance and the returns the same instance.
     * @returns {FollowsDao} singleton of FollowsDAO
     */
    public static getInstance = (): FollowsDao => {
        if (FollowsDao.dao == null) {
            FollowsDao.dao = new FollowsDao();
        }
        return FollowsDao.dao;
    }

    private constructor() { }

    /**
     * Returns the list of users followed by the given user
     * @param uid user id of the given user
     * @returns {Follows[]} list of follows object 
     */
    findUsersFollowedByUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({ followedBy: uid }).populate("following").exec();

    /**
     * Returns the list of users following the given user
     * @param uid user id of the given user
     * @returns {Follows[]} list of follows objects
     */
    findUsersFollowingUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({ following: uid }).populate("followedBy").exec();

    /**
     * Creates a record for Follows resource according to the user ids passed
     * @param uid_cur user id of the user following another user
     * @param uid user id of the user being followed
     * @returns Follow object created
     */
    followsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({ followedBy: uid_cur, following: uid });

    /**
     * Removes a previously created follows resource.
     * @param uid_cur user id of the user following another user
     * @param uid user id of the user being followed
     * @returns status of unfollowing
     */
    unfollowsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({ followedBy: uid_cur, following: uid });
}