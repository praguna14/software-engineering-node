/**
 * @file Interface for Tuit controller
 */
import {Request, Response} from "express";

/**
 * @interface TuitController defines all the methods that are 
 * required to be implemented by a controller.
 */
export default interface TuitController {
   findAllTuits(req: Request, res: Response): void;
   findTuitById(req: Request, res: Response): void;
   findTuitsByUser(req: Request, res: Response): void;
   createTuit(req: Request, res: Response): void;
   updateTuit(req: Request, res: Response): void;
   deleteTuit(req: Request, res: Response): void;
}
