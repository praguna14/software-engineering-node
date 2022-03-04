/**
 * @file Interface for Bookmarks controller
 */
import {Request, Response} from "express";

/**
 * @interface BookmarksController defines all the methods that are 
 * required to be implemented by a controller.
 */
export default interface BookmarksController{
    /**
     * Retrieves all bookmarked tuits by the user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findBookmarksOfUser(req: Request, res: Response): void;
    /**
     * Bookmarks a tuit for a given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit objects that were created.
     */
    bookmarkTuitForUser(req: Request, res: Response): void;
     /**
     * Removes a bookmarked tuit for a user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the number of bookmarks removed.
     */
    unbookmarkTuitForUser(req: Request, res: Response): void;
}