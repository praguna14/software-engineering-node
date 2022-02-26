import User from "./User";

export default interface Messages{
    message:string,
    to:User,
    from:User,
    sentOn:Date
}