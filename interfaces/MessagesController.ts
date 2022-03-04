/**
 * @file interface for MessagesController
 */
import Messages from "../models/Messages";
import {Request, Response} from "express";

/**
 * @interface MessagesController defines all the methods that are 
 * required to be implemented by a controller.
 */
export default interface MessagesController{
    findMessagesSentByUser (req: Request, res: Response): void;
    findMessagesSentToUser(req: Request, res: Response): void;
    sendMessage (req: Request, res: Response): void;
    unsendMessage (req: Request, res: Response): void;
}