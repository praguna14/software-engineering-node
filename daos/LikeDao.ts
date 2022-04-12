/**
 * @file DAO for Likes resource
 */
import LikeDaoInterface from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
import TuitModel from "../mongoose/TuitModel";
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";

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
        if (LikeDao.dao === null) {
            LikeDao.dao = new LikeDao();
        }
        return LikeDao.dao;
    }
    private constructor() { }

    /**
     * Retrieves the list of users that liked a particular tuit.
     * @param tid id of the given tuit
     * @returns {Like[]} list of users
     */
    findUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel.find({ tuit: tid }).populate("likedBy").exec();

    /**
     * Retreives the tuits that have been liked by a user
     * @param uid id of the user whose liked tuits are to be retreived
     * @returns list of tuits liked by the user
     */
    findTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel.find({ likedBy: uid }).populate("tuit").exec();

    /**
     * Stores a record in the database representing a user liking a tuit.
     * @param uid id of the user liking the tuid
     * @param tid id of the tuit being liked by the user
     * @returns JSON object representing the like relationship between the 
     * tuit and the user
     */
    likeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });
    /**
     * Removes an existing record representing a user liking a tuit.
     * @param uid id of ther user disliking the tuit
     * @param tid id of the tuit being disliked by the user
     * @returns status of dislike
     */
    dislikeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    /**
     * check if there's a likes document in the database for user/tuit combination
     * @param uid user id to search liked tuit on
     * @param tid tuit id to check for
     * @returns boolean representing presence of document
     */
    findUserLikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.findOne(
                { tuit: tid, likedBy: uid });
    /**
     * count how many users liked a tuit
     * @param tid tuit id of the tuit
     * @returns count of users liking the tuit
     */
    countHowManyLikedTuit =
        async (tid: string) =>
            LikeModel.count({ tuit: tid });

    /**
     * insert document into likes collection
     *  to record that user uid likes tuit tid
     * @param uid userid of the user
     * @param tid tuitid of the user
     * @returns created document
     */
    userLikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.create({ tuit: tid, likedBy: uid });

    /**
     * delete document from likes collection 
     * to record that user uid no longer 
     * likes tuit tid
     * @param uid id of the user
     * @param tid id of the tuit
     * @returns count of documents deleted
     */
    userUnlikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    /**
     * update a tuit's stats
     * @param tid id ot the tuit
     * @param newStats new stats of the tuit
     * @returns 
     */
    updateLikes =
        async (tid: string, newStats: object) =>
            TuitModel.updateOne(
                { _id: tid },
                { $set: { stats: newStats } });

    /**
     * Retrieves all tuit that liked a particular user
     * @param {string} uid User's id
     * @returns Promise
     */
    findAllTuitsLikedByUser = async (uid: string) =>
        LikeModel
            .find({ likedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();



    /**
     * Retrieves all tuit that disliked a particular user
     * @param {string} uid User's id
     * @returns Promise
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ dislikedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Retrieves all users that disliked a particular tuit
     * @param {string} tid Tuit's id
     * @returns 
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

}