import BookmarksDaoInterface from "../interfaces/BookmarksDao";
import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";

export default class BookmarksDao implements BookmarksDaoInterface {
    private static dao: BookmarksDao | null = null;
    public static getInstance = (): BookmarksDao => {
        if (BookmarksDao.dao === null) {
            BookmarksDao.dao = new BookmarksDao();
        }
        return BookmarksDao.dao;
    }
    private constructor() { }

    findBookmarksOfUser = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({ bookmarkedBy: uid }).populate("bookmarkedTuit").exec();

    bookmarkTuitForUser = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({ bookmarkedTuit: tid, bookmarkedBy: uid });

    unbookmarkTuitForUser = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
}