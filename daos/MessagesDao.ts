import MessagesDaoInterface from "../interfaces/MessagesDao";
import Messages from "../models/Messages";
import MessagesModel from "../mongoose/MessagesModel";

export default class MessagesDao implements MessagesDaoInterface {
    private static dao: MessagesDao | null = null;

    public static getInstance = (): MessagesDao => {
        if (MessagesDao.dao === null) {
            MessagesDao.dao = new MessagesDao();
        }
        return MessagesDao.dao;
    }

    private constructor() {
    }

    findMessagesByUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({ from: uid }).populate("message").exec();

    findMessagesToUser = async (uid: string): Promise<Messages[]> =>
        MessagesModel.find({ to: uid }).populate("message").exec();

    sendMessage = async (message: Messages): Promise<Messages> =>
        MessagesModel.create(message);

    deleteMessage = async (mid: string): Promise<any> =>
        MessagesModel.deleteOne({ _id: mid })

}