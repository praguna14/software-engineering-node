/**
 * @file DAO for Bookmarks resource
 */
import BookmarksDaoInterface from "../interfaces/BookmarksDao";
import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";

/**
 * @class BookmarksDao Implements the required method for accessing 
 * Bookmarks resource fromt the database.
 * 
 * @property {BookmarksDao} dao Singleton implemention methods for
 * accessing bookmarks resources  
 */
export default class BookmarksDao implements BookmarksDaoInterface {
    private static dao: BookmarksDao | null = null;

    /**
     * Returns the instance of BookmarksDao. If instance is not present the 
     * first creates the instance and the returns the same instance
     * @returns {BookmarksDAO} singleton of Bookmarks DAO
     */
    public static getInstance = (): BookmarksDao => {
        if (BookmarksDao.dao === null) {
            BookmarksDao.dao = new BookmarksDao();
        }
        return BookmarksDao.dao;
    }
    private constructor() { }

    /**
     * Retrieves a list of bookmarks of a given user.
     * @param uid Id representing the given user
     * @returns {Bookmarks[]} List of bookmarks of the user
     */
    findBookmarksOfUser = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({ bookmarkedBy: uid }).populate("bookmarkedTuit").exec();

    /**
     * Creates a new bookmark from the passed tuit for the passed user
     * @param tid represents the id of tuit to be bookmarked
     * @param uid represents the id of the user bookmarking the tuit
     * @returns {Bookmark} JSON object representing the newly created bookmark
     */
    bookmarkTuitForUser = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({ bookmarkedTuit: tid, bookmarkedBy: uid });

    /**
     * 
     * @param tid represents the id of the tuit to be unbookmarked
     * @param uid represents the id of the user unbookmarking the tuit.
     * @returns status of unbookmarking
     */
    unbookmarkTuitForUser = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
}