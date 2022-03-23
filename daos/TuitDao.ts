/**
 * @file DAO for Tuit resource
 */
import TuitDaoI from '../interfaces/TuitDao';
import Tuit from '../models/Tuit';
import TuitModel from '../mongoose/TuitModel';

/**
 * @class TuitDao implements the required methods for accessing
 * Tuits resources from the database.
 */
export default class TuitDao implements TuitDaoI {
    /**
     * Retreives all the tuits from the database
     * @returns List of Tuits
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Retreives the list of tuits by a given user
     * @param uid id of the user whose tuits are to be retreived
     * @returns list of tuits
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    /**
     * Retreives a tuit by its id
     * @param tid id of the tuit to be retreived
     * @returns JSON object representing the tuit
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    /**
     * Stores the passed tuit in the database.
     * @param tuit Object containing the tuit to be stored in the database
     * @returns Stored object along with id database id     
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    /**
     * Updates a given tuit
     * @param tid id of the tuit to be updated
     * @param tuit tuit object containing the updated info
     * @returns number of records updated
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id:tid}, {$set: tuit});
    }

    /**
     * Deletes a particular tuit
     * @param tid id of the tuit to be deleted
     * @returns status of the deletion of the tuit 
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }
    
    async deleteTuitByUser(uid: string): Promise<any> {
        return await TuitModel.deleteMany({postedBy:uid});
    }
}