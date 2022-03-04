/**
 * @file Tuit2Topic Represents the relationship between a tuit and a topic
 */
import Tuit from "./Tuit";
import Topic from "./Topic";

/**
 * @typedef Tuit2Topic Represents the relationship between a tuit and a topic
 */
export default class Tuit2Topic {
    private topic: Topic | null = null;
    private tuit: Tuit | null = null;
}