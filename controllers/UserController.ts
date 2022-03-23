/**
 * @file Controller RESTful Web service API for User resource
 */
import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for User resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the users from the database
 *     </li>
 *     <li>GET /users/:userid to retrieve information about a specific user
 *     </li>
 *     <li>POST /users to record creation of a user
 *     </li>
 *     <li>DELETE /users/:userid to record deleting a user object
 *     </li>
 *     <li>DELETE /users/:userid to record deleting a user object
 *     </li>
*     <li>PUT /users/:userid to update previously created user object
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing users CRUD operations
 * @property {UserController} UserController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return UserController
     */
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/api/users', this.findAllUsers);
        this.app.get('/api/users/:userid', this.findUserById);
        this.app.post('/api/users', this.createUser);
        this.app.delete('/api/users/:userid', this.deleteUser);
        this.app.put('/api/users/:userid', this.updateUser);
        this.app.delete("/api/users/username/:username/delete", this.deleteUsersByUsername);
    }
    /**
     * Retrieves all users from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));
    
    /**
     * Retrieves all users from the database having the same id passed in the request
     * @param {Request} req Represents request from client, including the userid 
     * representing a user stored in the database.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
    /**
     * Creates a user in the database according to the user object passed in the 
     * request body.
     * @param {Request} req Represents request from client, including the user object
     * in request body representing the user object to be created.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object created
     */
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));
    
    /**
     * Deletes an existing user in the database according to the user id passed in the 
     * request parameter.
     * @param {Request} req Represents request from client, including the user id
     * in request parameters representing the user to be deleted.
     * @param {Response} res Represents response to client, including the status of deletion
     * of the specified user
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
    
    /**
     * Updates an existing user in the database according to the user id passed in the 
     * request parameter and the request object passed in request body.
     * @param {Request} req Represents request from client, including the user id
     * in request parameters representing the user to be updated along the user object.
     * @param {Response} res Represents response to client, including the status of updation
     * of the specified user
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    
    deleteUsersByUsername = (req:Request, res:Response) => 
        this.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.send(status));
        
}

