import MessagesControllerI from "../interfaces/MessagesController";

import {Express,Response,Request} from "express";
import MessagesDao from "../daos/MessagesDao";

export default class MessagesController implements MessagesControllerI{
    private static messagesDao: MessagesDao = MessagesDao.getInstance();
    private static messagesController: MessagesController | null = null;

    public static getInstance = (app: Express): MessagesController => {
        if(MessagesController.messagesController === null) {
            MessagesController.messagesController = new MessagesController();
            app.get("/messages/sent/:uid", MessagesController.messagesController.findMessagesSentByUser);
            app.get("/messages/received/:uid", MessagesController.messagesController.findMessagesSentToUser);
            app.post("/messages/send/:uid", MessagesController.messagesController.sendMessage);
            app.delete("/messages/delete/:mid", MessagesController.messagesController.unsendMessage);
        }
        return MessagesController.messagesController;
    }

    private constructor() {}
    findMessagesSentByUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findMessagesByUser(req.params.uid)
            .then(messages=>res.json(messages));

    findMessagesSentToUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findMessagesToUser(req.params.uid)
            .then(messages=>res.json(messages));

    sendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.sendMessage(req.body)
            .then(messages=>res.json(messages));

    unsendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.deleteMessage(req.params.mid)
            .then(status=>res.send(status));
    
}