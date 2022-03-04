/**
 * @file Defines the Tuit2Tag datatype that represents a relationship
 * between a tag and a tuit
 */
import Tuit from "./Tuit";
import Tag from "./Tag";

/**
 * @typedef Tuit2Tag represents relationship between a tuit and its tag
 * @property {Tag} tag tag on the tuit
 * @property {Tuit} tuit tuit that is tagged
 */
export default class Tuit2Tag {
    private tag: Tag | null = null;
    private tuit: Tuit | null = null;
}