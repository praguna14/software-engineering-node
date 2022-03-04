import Tuit from "../models/Tuit";

/**
 * @file Declares API for Tuit related data access object methods
 */
export default interface TuitDao {
   findAllTuits(): Promise<Tuit[]>;
   findTuitsByUser(uid: string): Promise<Tuit[]>;
   findTuitById(tid: string): Promise<Tuit>;
   createTuit(tuit: Tuit): Promise<Tuit>;
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   deleteTuit(tid: string): Promise<any>;
}

