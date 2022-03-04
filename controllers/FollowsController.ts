/**
 * @file Controller RESTful Web service API for Follows resource
 */
import FollowsControllerInterface from "../interfaces/FollowsController";
import FollowsDao from "../daos/FollowsDao";
import { Express, Request, Response } from "express";

/**
 * @class FollowsController Implements RESTful Web service API for Follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /users/:uid1/unfollows/:uid2 to remove a user following another user
 *     </li>
 *     <li>GET /users/:uid/following to retrieve list of users followed by the users
 *     </li>
 *     <li>GET /users/:uid/followedby to retrieve users following the given user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {FollowsDao} dao Singleton DAO implementing FollowsController CRUD operations
 * @property {FollowsController} controller Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowsController implements FollowsControllerInterface {
    private static dao: FollowsDao = FollowsDao.getInstance();
    private static controller: FollowsController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowsController
     */
    public static getInstance = (app: Express): FollowsController => {
        if (FollowsController.controller === null) {
            FollowsController.controller = new FollowsController();
            app.post("/users/:uid1/follows/:uid2", FollowsController.controller.followsUser);
            app.delete("/users/:uid1/unfollows/:uid2", FollowsController.controller.unfollowsUser);
            app.get("/users/:uid/following", FollowsController.controller.findUsersFollowedByUser);
            app.get("/users/:uid/followedby", FollowsController.controller.findUsersFollowingUser);
        }
        return FollowsController.controller;
    }

    /**
     * Retrieves all users that are followed by the given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersFollowedByUser = (req: Request, res: Response) =>
        FollowsController.dao.findUsersFollowedByUser(req.params.uid)
            .then(following => res.json(following));

    /**
     * Retrieves all users that are following the given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersFollowingUser = (req: Request, res: Response) =>
        FollowsController.dao.findUsersFollowingUser(req.params.uid)
            .then(followedby => res.json(followedby));

    /**
     * Records the given user following another user.
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the given user and the
     * user getting followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Follows object stored in
     * the databse.
     */
    followsUser = (req: Request, res: Response) =>
        FollowsController.dao.followsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * Records the given user unfollowing another user.
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the given user and the
     * user getting followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Follows object stored in
     * the databse.
     */
    unfollowsUser = (req: Request, res: Response) =>
        FollowsController.dao.unfollowsUser(req.params.uid1, req.params.uid)
            .then(status => res.send(status));

}