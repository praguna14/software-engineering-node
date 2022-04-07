/**
 * @file Defines the User datatype used to represent a user using the Tuitter platform
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents a user that is using the platfomr
 * @property {string} username username of the user
 * @property {string} password password of the user
 * @property {string} firstname firstname of the user
 * @property {string} lastname lastname of the user
 * @property {string} email email of the user
 * @property {string} profilePhoto profilePhoto of the user
 * @property {string} headerImage headerImage of the user
 * @property {AccountType} accountType accountType of the user
 * @property {MaritalStatus} maritalStatus maritalStatus of the user
 * @property {string} biography biography of the user
 * @property {Date} dateOfBirth dateOfBirth of the user
 * @property {Date} joined Date when the user joined
 * @property {Location} location location of the user
 */
export default class User {
    private username: string = '';
    public password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}

