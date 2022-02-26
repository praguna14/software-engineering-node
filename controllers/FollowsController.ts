import FollowsControllerInterface from "../interfaces/FollowsController";
import FollowsDao from "../daos/FollowsDao";
import { Express, Request, Response } from "express";

export default class FollowsController implements FollowsControllerInterface {
    private static dao: FollowsDao = FollowsDao.getInstance();
    private static controller: FollowsController | null = null;

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

    findUsersFollowedByUser = (req: Request, res: Response) =>
        FollowsController.dao.findUsersFollowedByUser(req.params.uid)
            .then(following => res.json(following));

    findUsersFollowingUser = (req: Request, res: Response) =>
        FollowsController.dao.findUsersFollowingUser(req.params.uid)
            .then(followedby => res.json(followedby));

    followsUser = (req: Request, res: Response) =>
        FollowsController.dao.followsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    unfollowsUser = (req: Request, res: Response) =>
        FollowsController.dao.unfollowsUser(req.params.uid1, req.params.uid)
            .then(status => res.send(status));

}