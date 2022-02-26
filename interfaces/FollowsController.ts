import {Request, Response} from "express";

export default interface FollowsController{
    findUsersFollowedByUser(req:Request,res:Response):void;
    findUsersFollowingUser(req: Request, res: Response): void;
    followsUser(req: Request, res: Response): void;
    unfollowsUser(req: Request, res: Response): void;
}