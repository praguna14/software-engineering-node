/**
 * @file DAO for Likes resource
 */
import LikeDaoInterface from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements the required method for accessing 
 * Likes resource fromt the database.
 * 
 * @property {LikeDao} dao Singleton implemention methods for
 * accessing Likes resources  
 */
export default class LikeDao implements LikeDaoInterface {
    private static dao: LikeDao | null = null;
    /**
     * Returns the instance of LikeDao. If instance is not present the 
     * first creates the instance and the returns the same instance.
     * @returns {LikeDao} singleton of Likes DAO
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.dao === null) {
            LikeDao.dao = new LikeDao();
        }
        return LikeDao.dao;
    }
    private constructor() {}

    /**
     * Retrieves the list of users that liked a particular tuit.
     * @param tid id of the given tuit
     * @returns {Like[]} list of users
     */
    findUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel.find({tuit: tid}).populate("likedBy").exec();

    /**
     * Retreives the tuits that have been liked by a user
     * @param uid id of the user whose liked tuits are to be retreived
     * @returns list of tuits liked by the user
     */
    findTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel.find({likedBy: uid}).populate("tuit").exec();

    /**
     * Stores a record in the database representing a user liking a tuit.
     * @param uid id of the user liking the tuid
     * @param tid id of the tuit being liked by the user
     * @returns JSON object representing the like relationship between the 
     * tuit and the user
     */
    likeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    /**
     * Removes an existing record representing a user liking a tuit.
     * @param uid id of ther user disliking the tuit
     * @param tid id of the tuit being disliked by the user
     * @returns status of dislike
     */
    dislikeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}