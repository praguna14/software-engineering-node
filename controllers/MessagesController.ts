/**
 * @file Controller RESTful Web service API for Messages resource
 */
import MessagesControllerInterface from "../interfaces/MessagesController";

import {Express,Response,Request} from "express";
import MessagesDao from "../daos/MessagesDao";

/**
 * @class MessagesController Implements RESTful Web service API for Messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /messages/sent/:uid to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /messages/received/:uid to retrieve all the messages received by a user
 *     </li>
 *     <li>POST /messages/send to record that a message sent to a user
 *     </li>
 *     <li>DELETE /messages/delete/:mid to record deletion of a previously sent message</li>
 * </ul>
 * @property {MessagesDao} likeDao Singleton DAO implementing Messages CRUD operations
 * @property {MessagesController} MessagesController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessagesController implements MessagesControllerInterface{
    private static messagesDao: MessagesDao = MessagesDao.getInstance();
    private static messagesController: MessagesController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessagesController
     */
    public static getInstance = (app: Express): MessagesController => {
        if(MessagesController.messagesController === null) {
            MessagesController.messagesController = new MessagesController();
            app.get("/messages/sent/:uid", MessagesController.messagesController.findMessagesSentByUser);
            app.get("/messages/received/:uid", MessagesController.messagesController.findMessagesSentToUser);
            app.post("/messages/send", MessagesController.messagesController.sendMessage);
            app.delete("/messages/delete/:mid", MessagesController.messagesController.unsendMessage);
        }
        return MessagesController.messagesController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user from the database.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSentByUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findMessagesByUser(req.params.uid)
            .then(messages=>res.json(messages));

    /**
     * Retrieves all messages sent to a user from the database.
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSentToUser = (req: Request, res: Response)=>
        MessagesController.messagesDao.findMessagesToUser(req.params.uid)
            .then(messages=>res.json(messages));

    /**
     * Sends message to a user.
     * @param {Request} req Represents request from client, including the request
     * body containing the message 
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    sendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.sendMessage(req.body)
            .then(messages=>res.json(messages));

     /**
     * Deletes a previously sent message.
     * @param {Request} req Represents the request from client, including the mid 
     * representing the id of the message to be deleted.
     * @param {Response} res Represents response to client, including the
     * boolean indicating the status of message deletion.
     */
    unsendMessage = (req: Request, res: Response)=>
        MessagesController.messagesDao.deleteMessage(req.params.mid)
            .then(status=>res.send(status));
    
}