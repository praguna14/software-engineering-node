import Messages from "../models/Messages";
import {Request, Response} from "express";

export default interface MessagesController{
    findMessagesSentByUser (req: Request, res: Response): void;
    findMessagesSentToUser(req: Request, res: Response): void;
    sendMessage (req: Request, res: Response): void;
    unsendMessage (req: Request, res: Response): void;
}