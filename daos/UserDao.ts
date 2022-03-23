/**
 * @file DAO for User resource
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDAO implements the required method of accessing 
 * User resources from the database.
 */
export default class UserDao implements UserDaoI {
    /**
     * Retreives a list of all the users from the database
     * @returns List of user
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    /**
     * Retreives the information about a user given its ID
     * @param uid id of user whose info has to be retreived
     * @returns JSON object representing the user   
     */
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }

    /**
     * Creates a user in the database according to the user object
     * @param user User object to be stored in the database
     * @returns JSON object stored in the database along with its database id
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Deletes a user record from the database
     * @param uid id of the user to be deleted
     * @returns status of deletion of the user
     */
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }
    /**
     * Updates the content of one of the user record in the databse.
     * @param uid id of the user to be updated
     * @param user user object to be updateded in the database
     * @returns number of records updated
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }

    async deleteUsersByUsername(username: string): Promise<any> {
        return await UserModel.deleteMany({username: username});
    }
}

