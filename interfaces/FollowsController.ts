/**
 * @file Interface for Follows Controller
 */
import { Request, Response } from "express";

/**
 * @interface FollowsController defines all the methods that are 
 * required to be implemented by a controller.
 */
export default interface FollowsController {
    /**
     * Retrieves all users that are followed by the given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersFollowedByUser(req: Request, res: Response): void;
    /**
     * Retrieves all users that are following the given user.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the given user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersFollowingUser(req: Request, res: Response): void;
    /**
    * Records the given user following another user.
    * @param {Request} req Represents request from client, including the
    * path parameters uid1 and uid2 representing the given user and the
    * user getting followed.
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON containing the new Follows object stored in
    * the databse.
    */
    followsUser(req: Request, res: Response): void;
    /**
     * Records the given user unfollowing another user.
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the given user and the
     * user getting followed.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Follows object stored in
     * the databse.
     */
    unfollowsUser(req: Request, res: Response): void;
}