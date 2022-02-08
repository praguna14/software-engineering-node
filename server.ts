import express, {Request, Response} from 'express';
import TuitController from './controllers/TuitController';
import UserController from './controllers/UserController';
import TuitDao from './daos/TuitDao';
import UserDao from './daos/UserDao';
import mongoose from 'mongoose';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.oyfyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = new UserController(app, new UserDao());
const tuitControler = new TuitController(app, new TuitDao());

const PORT = 4000;
app.listen(process.env.PORT || PORT);