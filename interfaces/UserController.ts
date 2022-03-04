/**
 * @file interface for UserController implementation
 */
import {Request, Response} from "express";

/**
 * @interface UserController defines the methods required to be 
 * implemented by a class implementation of UserController
 */
export default interface UserController {
   findAllUsers(req: Request, res: Response): void;
   findUserById(req: Request, res: Response): void;
   createUser(req: Request, res: Response): void;
   deleteUser(req: Request, res: Response): void;
   updateUser(req: Request, res: Response): void;
}
