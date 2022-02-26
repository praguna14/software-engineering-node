import Like from "../models/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDao {
    findUsersThatLikedTuit (tid: string): Promise<Like[]>;
    findTuitsLikedByUser (uid: string): Promise<Like[]>;
    likeTuit (tid: string, uid: string): Promise<Like>;
    dislikeTuit (tid: string, uid: string): Promise<any>;
};