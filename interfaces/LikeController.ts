import {Request, Response} from "express";

export default interface LikeController {
    findUsersThatLikedTuit (req: Request, res: Response): void;
    findTuitsLikedByUser (req: Request, res: Response): void;
    likeTuit (req: Request, res: Response): void;
    dislikeTuit (req: Request, res: Response): void;
};