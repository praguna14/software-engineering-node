/**
 * @file Declares Bookmarks data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */

/**
 * @typedef Location Represents a location object
 * @property {number} latitude number representing latitude
 * @property {number} longitude number representing longitude
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};

