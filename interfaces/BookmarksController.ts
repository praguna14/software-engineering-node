import {Request, Response} from "express";

export default interface BookmarksController{
    findBookmarksOfUser(req: Request, res: Response): void;
    bookmarkTuitForUser(req: Request, res: Response): void;
    unbookmarkTuitForUser(req: Request, res: Response): void;
}