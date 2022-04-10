/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerInterface from "../interfaces/LikeController";
import TuitDao from '../daos/TuitDao';

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerInterface {
    private static dao: LikeDao = LikeDao.getInstance();
    private static controller: LikeController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.controller === null) {
            LikeController.controller = new LikeController();
            app.get("/users/:uid/likes", LikeController.controller.findTuitsLikedByUser);
            app.get("/tuits/:tid/likes", LikeController.controller.findUsersThatLikedTuit);
            app.post("/users/:uid/likes/:tid", LikeController.controller.likeTuit);
            app.delete("/users/:uid/unlikes/:tid", LikeController.controller.dislikeTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.controller.userTogglesTuitLikes);
            app.put("/api/users/:uid/unlikes/:tid", LikeController.controller.userTogglesTuitDisLikes);
        }
        return LikeController.controller;
    }

    private constructor() { }

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.dao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.dao.findTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    likeTuit = (req: Request, res: Response) =>
        LikeController.dao.likeTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    dislikeTuit = (req: Request, res: Response) =>
        LikeController.dao.dislikeTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.dao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.dao
                .countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await LikeController.dao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                await LikeController.dao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.dislikes = tuit.stats.dislikes - 1;
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }

    }

    userTogglesTuitDisLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        try {
            const userAlreadyLikedTuit = await LikeController.dao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.dao
                .countHowManyLikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            let prevDislikes = tuit.stats.dislikes;
            let prevLikes = tuit.stats.likes;
            if (userAlreadyLikedTuit) {
                await LikeController.dao.userUnlikesTuit(userId, tid);
                prevDislikes += 1;
                prevLikes -= 1
            } else {
                prevDislikes += 1;
                prevLikes -= 1;
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

};