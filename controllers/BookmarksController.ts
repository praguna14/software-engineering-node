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
 *     <li>POST /users/:uid/bookmarks/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarksController implements BookmarksControllerInterface {
    private static dao: BookmarksDao = BookmarksDao.getInstance();
    private static controller: BookmarksController | any = null;

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

    findBookmarksOfUser = (req: Request, res: Response) =>
        BookmarksController.dao.findBookmarksOfUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    bookmarkTuitForUser = (req: Request, res: Response) =>
        BookmarksController.dao.bookmarkTuitForUser(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    unbookmarkTuitForUser = (req: Request, res: Response) =>
        BookmarksController.dao.unbookmarkTuitForUser(req.params.tid, req.params.uid)
            .then(status => res.send(status));

}