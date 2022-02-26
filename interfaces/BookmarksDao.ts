import Bookmarks from "../models/Bookmarks";

export default interface BookmarksDao{
    findBookmarksOfUser(uid:string):Promise<Bookmarks[]>;
    bookmarkTuitForUser(tid:string,uid:string):Promise<any>;
    unbookmarkTuitForUser(tid:string,uid:string):Promise<Bookmarks>;
}