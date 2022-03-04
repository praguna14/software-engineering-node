/**
 * @fiel DAO for Messages resource
 */
import MessagesDaoInterface from "../interfaces/MessagesDao";
import Messages from "../models/Messages";
import MessagesModel from "../mongoose/MessagesModel";

/**
 * @class MessagesDao Implements the required method for accessing 
 * Messages resource fromt the database.
 * 
 * @property {MessagesDao} dao Singleton implemention methods for
 * accessing Messages resources  
 */
export default class MessagesDao implements MessagesDaoInterface {
    private static dao: MessagesDao | null = null;
    /**
     * Returns the instance of MessagesDao. If instance is not present the 
     * first creates the instance and the returns the same instance.
     * @returns {MessagesDao} singleton of Messages` DAO
     */
    public static getInstance = (): MessagesDao => {
        if (MessagesDao.dao === null) {
            MessagesDao.dao = new MessagesDao();
        }
        return MessagesDao.dao;
    }

    private constructor() {
    }

    /**
     * Retreives the list of messages sent by the given user.
     * @param uid id of the user whose messages have to be retreived
     * @returns list of messages sent by user
     */
    findMessagesByUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({ from: uid }).populate("message").exec();

    /**
     * Retreives the list of messages sent to the given user
     * @param uid id of the user to whom messages have been sent
     * @returns list of messages sent to the user
     */
    findMessagesToUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({ to: uid }).populate("message").exec();

    /**
     * Sends a message between two users
     * @param message message object to be sent
     * @returns message object that was sent
     */
    sendMessage = async (message: Messages): Promise<Messages> =>
        MessagesModel.create(message);

    /**
     * Deletes a previously creates message
     * @param mid message id of the message to be deleted
     * @returns status of deletion of the message.
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessagesModel.deleteOne({ _id: mid })

}