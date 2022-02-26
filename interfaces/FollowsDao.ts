import Follows from "../models/Follows";

export default interface FollowsDao {
    findUsersFollowedByUser (uid:string): Promise<Follows[]>;
    findUsersFollowingUser(uid:string): Promise<Follows[]>;
    followsUser(uid_cur:String,uid:string):Promise<any>;
    unfollowsUser(uid_cur:String, uid:string):Promise<Follows>;
}