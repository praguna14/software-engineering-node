import Messages from "../models/Messages";

export default interface MessagesDao{
    findMessagesByUser(uid:string):Promise<Messages[]>;
    findMessagesToUser(uid:string):Promise<Messages[]>;
    sendMessage(message:Messages):Promise<Messages>;
    deleteMessage(mid:string):Promise<any>;
}