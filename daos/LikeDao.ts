import LikeDaoInterface from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
export default class LikeDao implements LikeDaoInterface {
    private static dao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.dao === null) {
            LikeDao.dao = new LikeDao();
        }
        return LikeDao.dao;
    }
    private constructor() {}

    findUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel.find({tuit: tid}).populate("likedBy").exec();

    findTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel.find({likedBy: uid}).populate("tuit").exec();

    likeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    dislikeTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}