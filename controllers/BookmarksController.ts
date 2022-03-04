/**
 * @file Controller RESTful Web service API for bookmarks resource
 */

import { Express, Request, Response } from "express";
import BookmarksControllerInterface from "../interfaces/BookmarksController";
import BookmarksDao from "../daos/BookmarksDao";

/**
 * @class BookmarksController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks to retrieve all the tuits bookmarked tuits by a user
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid to record all users that liked a tuit
 *     </li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to record that a user likes a tuit
 *     </li>
 * </ul>
 * @property {BookmarksDao} dao Singleton DAO implementing Bookmarks CRUD operations
 * @property {BookmarksController} controller Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarksController implements BookmarksControllerInterface {
    private static dao: BookmarksDao = BookmarksDao.getInstance();
    private static controller: BookmarksController | any = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {BookmarksController}
     */
    public static getInstance = (app: Express): BookmarksController => {
        if (BookmarksController.controller === null) {
            BookmarksController.controller = new BookmarksController();
            app.get("/users/:uid/bookmarks", BookmarksController.controller.findBookmarksOfUser);
            app.post("/users/:uid/bookmarks/:tid", BookmarksController.controller.bookmarkTuitForUser);
            app.delete("/users/:uid/bookmarks/:tid", BookmarksController.controller.unbookmarkTuitForUser);
        }
        return BookmarksController.controller;
    }

    private constructor() { }

    /**
     * Retrieves all bookmarked tuits by the user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findBookmarksOfUser = (req: Request, res: Response) =>
        BookmarksController.dao.findBookmarksOfUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Bookmarks a tuit for a given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit objects that were created.
     */
    bookmarkTuitForUser = (req: Request, res: Response) =>
        BookmarksController.dao.bookmarkTuitForUser(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes a bookmarked tuit for a user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the tuit.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the number of bookmarks removed.
     */
    unbookmarkTuitForUser = (req: Request, res: Response) =>
        BookmarksController.dao.unbookmarkTuitForUser(req.params.tid, req.params.uid)
            .then(status => res.send(status));

}