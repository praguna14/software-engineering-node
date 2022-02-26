import FollowsDaoInterface from "../interfaces/FollowsDao";
import Follows from "../models/Follows";
import FollowsModel from "../mongoose/FollowsModel";

export default class FollowsDao implements FollowsDaoInterface {
    private static dao: FollowsDao | null = null;
    public static getInstance = (): FollowsDao => {
        if (FollowsDao.dao == null) {
            FollowsDao.dao = new FollowsDao();
        }
        return FollowsDao.dao;
    }

    private constructor() { }

    findUsersFollowedByUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({ followedBy: uid }).populate("following").exec();

    findUsersFollowingUser = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({ following: uid }).populate("followedBy").exec();

    followsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({ followedBy: uid_cur, following: uid });

    unfollowsUser = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({ followedBy: uid_cur, following: uid });
}