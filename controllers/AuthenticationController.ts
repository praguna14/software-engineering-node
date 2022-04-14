import { Express, Request, Response } from "express";
import UserDao from "../daos/UserDao";
import bcrypt from "bcrypt";
const saltRounds = 10;

declare global {
  var profileUser : any;
}

var profileUser: undefined = undefined;

const AuthenticationController = (app: Express) => {

  const userDao: UserDao = UserDao.getInstance();

  const signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao
      .findUserByUsername(req.body.username);
    if (existingUser) {
      res.sendStatus(403);
      return;
    } else {
      const insertedUser = await userDao
        .createUser(newUser);
      insertedUser.password = '';
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  const profile = (req: Request, res: Response) => {
    //@ts-ignore
    console.log(`In Login Request session profile set as : ${req.session['profile']}`)
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else if (profileUser != undefined){
      res.json(profileUser);
    }else {
      res.sendStatus(403);
    }
  }

  const logout = (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy((err)=> console.log("Error while destroying request session: ", err));
    profileUser=undefined;
    res.sendStatus(200);
  }

  const login = async (req: Request, res: Response) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
      .findUserByUsername(username);
  
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
  
    const match = await bcrypt
      .compare(password, existingUser.password);
  
    if (match) {
      existingUser.password = '*****';
      //@ts-ignore
      req.session['profile'] = existingUser;
      profileUser = existingUser;
      //@ts-ignore
      console.log(`In Login Request session profile set as : ${profileUser}`)
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };

  app.post("/api/auth/login", login);
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/signup", signup);
}

export default AuthenticationController;