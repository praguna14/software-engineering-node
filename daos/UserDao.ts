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
    private static dao: UserDao | null = null;

    /**
     * Returns the instance of BookmarksDao. If instance is not present the 
     * first creates the instance and the returns the same instance
     * @returns {BookmaUserDaorksDAO} singleton of Bookmarks DAO
     */
     public static getInstance = (): UserDao => {
        if (UserDao.dao === null) {
            UserDao.dao = new UserDao();
        }
        return UserDao.dao;
    }

    /**
     * Retreives a list of all the users from the database
     * @returns List of user
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }
    /**
     * Retreives the information about a user given its ID
     * @param uid id of user whose info has to be retreived
     * @returns JSON object representing the user   
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    /**
     * Creates a user in the database according to the user object
     * @param user User object to be stored in the database
     * @returns JSON object stored in the database along with its database id
     */
    async createUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    /**
     * Deletes a user record from the database
     * @param uid id of the user to be deleted
     * @returns status of deletion of the user
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({ _id: uid });
    }
    /**
     * Updates the content of one of the user record in the databse.
     * @param uid id of the user to be updated
     * @param user user object to be updateded in the database
     * @returns number of records updated
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({ _id: uid }, { $set: user });
    }

    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username: username});
    }

    /**
     * Returns the first user object having the username provided as the input.
     * @param username username of the user
     * @returns first user having the username provided
     */
    async findUserByUsername(username: string): Promise<any> {
        return UserModel.findOne({username});
    }
}

