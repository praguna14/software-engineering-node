/**
 * @file interface for Bookmarks DAO
 */
import Bookmarks from "../models/Bookmarks";

/**
 * @interface defines all the methods that are 
 * required to be implemented by a DAO.
 */
export default interface BookmarksDao{
    /**
     * Retrieves a list of bookmarks of a given user.
     * @param uid Id representing the given user
     * @returns {Bookmarks[]} List of bookmarks of the user
     */
    findBookmarksOfUser(uid:string):Promise<Bookmarks[]>;
    /**
     * Creates a new bookmark from the passed tuit for the passed user
     * @param tid represents the id of tuit to be bookmarked
     * @param uid represents the id of the user bookmarking the tuit
     * @returns 
     */
    bookmarkTuitForUser(tid:string,uid:string):Promise<any>;
    /**
     * 
     * @param tid represents the id of the tuit to be unbookmarked
     * @param uid represents the id of the user unbookmarking the tuit.
     * @returns 
     */
    unbookmarkTuitForUser(tid:string,uid:string):Promise<Bookmarks>;
}