/**
 * @file Controller RESTful Web service API for Tuits resource
 */
import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class TuitController Implements RESTful Web service API for Tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retreive all the tuits
 *     </li>
 *     <li>GET /tuits/:tuitid to retreive the tuit by its tuit id
 *     </li>
 *     <li>POST /tuits to record creation of a tuit
 *     </li>
 *     <li>DELETE /tuits/:tuitid to delete a specific tuit
 *     </li>
 *     <li>PUT /tuits/:tuitid to update a specific tuit
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing Tuit CRUD operations
 * @property {TuitController} TuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDao;

  /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return TuitController
    */
  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get('/api/tuits', this.findAllTuits);
    this.app.get("/api/users/:uid/tuits", this.findAllTuitsByUser);
    this.app.get('/api/tuits/:tuitid', this.findTuitById);
    this.app.post('/api/tuits', this.createTuit);
    this.app.post("/api/users/:uid/tuits", this.createTuitByUser);
    this.app.delete('/api/tuits/:tuitid', this.deleteTuit);
    this.app.delete('/api/users/tuits/:uid', this.deleteTuitByUser);
    this.app.put('/api/tuits/:tuitid', this.updateTuit);
  }

  /**
    * Retrieves all tuits by a user from the database
    * @param {Request} req Represents request from client, including the path
    * parameter uid representing the user whose tuits have to be found.
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the tuits objects
    */
  findTuitsByUser(req: Request, res: Response): void {
    this.tuitDao.findTuitsByUser(req.params.uid)
      .then(tuits => res.json(tuits));
  }

  /**
   * Retrieves all tuits from the database
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuits objects
   */
  findAllTuits = (req: Request, res: Response) =>
    this.tuitDao.findAllTuits()
      .then(tuits => res.json(tuits));

  /**
    * Retrieves all tuits from the database that match with the id passed in path parameters
    * @param {Request} req Represents request from client, including the path
    * parameter tid representing the tuit id.
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the tuits objects
    */
  findTuitById = (req: Request, res: Response) =>
    this.tuitDao.findTuitById(req.params.tuitid)
      .then(tuit => res.json(tuit));

  /**
    * Creates a tuit object in the database according to the request object passed.
    * @param {Request} req Represents request from client, including the body containing
    * tuit object to be created.
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON object representing the object created.
    */
  createTuit = (req: Request, res: Response) =>
    this.tuitDao.createTuit(req.body)
      .then(tuit => res.json(tuit));


  /**
   * @param {Request} req Represents request from client, including the
   * path parameters tid representing the tuit being deleted
   * @param {Response} res Represents response to client, including status
   * on whether deleting the tuit was successful or not
   */
  deleteTuit = (req: Request, res: Response) =>
    this.tuitDao.deleteTuit(req.params.tuitid)
      .then(status => res.json(status));

  /**
   * Updates the tuit according to the tuit object passed in the body.
   * @param {Request} req Represents request from client, including the
   * path parameters tid representing the tuit being updated
   * @param {Response} res Represents response to client, including status
   * on whether updating the tuit was successful or not
   */
  updateTuit = (req: Request, res: Response) =>
    this.tuitDao.updateTuit(req.params.tuitid, req.body)
      .then(status => res.json(status));

  findAllTuitsByUser = (req: Request, res: Response) =>
    this.tuitDao.findTuitsByUser(req.params.uid);

  createTuitByUser = (req: Request, res: Response) =>
    this.tuitDao.createTuitByUser(req.params.uid, req.body)
      .then(tuit => res.json(tuit));
  
  deleteTuitByUser = (req: Request, res: Response) => 
    this.tuitDao.deleteTuitByUser(req.params.uid)
      .then(status => res.json(status));
}

