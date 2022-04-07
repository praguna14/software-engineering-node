"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const AuthenticationController = (app) => {
    const userDao = UserDao_1.default.getInstance();
    const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao
                .createUser(newUser);
            insertedUser.password = '';
            //@ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    const profile = (req, res) => {
        //@ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    const logout = (req, res) => {
        //@ts-check
        req.session.destroy((err) => console.log("Error while destroying request session: ", err));
        res.sendStatus(200);
    };
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = yield userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }
        const match = yield bcrypt_1.default
            .compare(password, existingUser.password);
        if (match) {
            existingUser.password = '*****';
            //@ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/signup", signup);
};
exports.default = AuthenticationController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL3ByYWd1bmFzaW5naC9Eb2N1bWVudHMvTkVVL0ZTRSA1NTAwL3NvZnR3YXJlLWVuZ2luZWVyaW5nLW5vZGUvY29udHJvbGxlcnMvQXV0aGVudGljYXRpb25Db250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvVXNlcnMvcHJhZ3VuYXNpbmdoL0RvY3VtZW50cy9ORVUvRlNFIDU1MDAvc29mdHdhcmUtZW5naW5lZXJpbmctbm9kZS9jb250cm9sbGVycy9BdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBc0M7QUFDdEMsb0RBQTRCO0FBQzVCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUV0QixNQUFNLHdCQUF3QixHQUFHLENBQUMsR0FBWSxFQUFFLEVBQUU7SUFFaEQsTUFBTSxPQUFPLEdBQVksaUJBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUUvQyxNQUFNLE1BQU0sR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtRQUNuRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDbEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFeEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxPQUFPO2FBQy9CLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixPQUFPO1NBQ1I7YUFBTTtZQUNMLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTztpQkFDL0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLFlBQVksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQzNCLFlBQVk7WUFDWixHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQyxDQUFBLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtRQUM5QyxZQUFZO1FBQ1osTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDLENBQUE7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtRQUM3QyxXQUFXO1FBQ1gsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxRixHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQTtJQUVELE1BQU0sS0FBSyxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO1FBQ2xELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTzthQUMvQixrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxnQkFBTTthQUN2QixPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QyxJQUFJLEtBQUssRUFBRTtZQUNULFlBQVksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ2hDLFlBQVk7WUFDWixHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQyxDQUFBLENBQUM7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQUVELGtCQUFlLHdCQUF3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwcmVzcywgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IFVzZXJEYW8gZnJvbSBcIi4uL2Rhb3MvVXNlckRhb1wiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCI7XG5jb25zdCBzYWx0Um91bmRzID0gMTA7XG5cbmNvbnN0IEF1dGhlbnRpY2F0aW9uQ29udHJvbGxlciA9IChhcHA6IEV4cHJlc3MpID0+IHtcblxuICBjb25zdCB1c2VyRGFvOiBVc2VyRGFvID0gVXNlckRhby5nZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHNpZ251cCA9IGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBuZXdVc2VyID0gcmVxLmJvZHk7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBuZXdVc2VyLnBhc3N3b3JkO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdFJvdW5kcyk7XG4gICAgbmV3VXNlci5wYXNzd29yZCA9IGhhc2g7XG5cbiAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCB1c2VyRGFvXG4gICAgICAuZmluZFVzZXJCeVVzZXJuYW1lKHJlcS5ib2R5LnVzZXJuYW1lKTtcbiAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XG4gICAgICByZXMuc2VuZFN0YXR1cyg0MDMpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbnNlcnRlZFVzZXIgPSBhd2FpdCB1c2VyRGFvXG4gICAgICAgIC5jcmVhdGVVc2VyKG5ld1VzZXIpO1xuICAgICAgaW5zZXJ0ZWRVc2VyLnBhc3N3b3JkID0gJyc7XG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIHJlcS5zZXNzaW9uWydwcm9maWxlJ10gPSBpbnNlcnRlZFVzZXI7XG4gICAgICByZXMuanNvbihpbnNlcnRlZFVzZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2ZpbGUgPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgY29uc3QgcHJvZmlsZSA9IHJlcS5zZXNzaW9uWydwcm9maWxlJ107XG4gICAgaWYgKHByb2ZpbGUpIHtcbiAgICAgIHByb2ZpbGUucGFzc3dvcmQgPSBcIlwiO1xuICAgICAgcmVzLmpzb24ocHJvZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zZW5kU3RhdHVzKDQwMyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9nb3V0ID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIC8vQHRzLWNoZWNrXG4gICAgcmVxLnNlc3Npb24uZGVzdHJveSgoZXJyKT0+IGNvbnNvbGUubG9nKFwiRXJyb3Igd2hpbGUgZGVzdHJveWluZyByZXF1ZXN0IHNlc3Npb246IFwiLCBlcnIpKTtcbiAgICByZXMuc2VuZFN0YXR1cygyMDApO1xuICB9XG5cbiAgY29uc3QgbG9naW4gPSBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgdXNlciA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHVzZXJuYW1lID0gdXNlci51c2VybmFtZTtcbiAgICBjb25zdCBwYXNzd29yZCA9IHVzZXIucGFzc3dvcmQ7XG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgdXNlckRhb1xuICAgICAgLmZpbmRVc2VyQnlVc2VybmFtZSh1c2VybmFtZSk7XG4gIFxuICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XG4gICAgICByZXMuc2VuZFN0YXR1cyg0MDMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgY29uc3QgbWF0Y2ggPSBhd2FpdCBiY3J5cHRcbiAgICAgIC5jb21wYXJlKHBhc3N3b3JkLCBleGlzdGluZ1VzZXIucGFzc3dvcmQpO1xuICBcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGV4aXN0aW5nVXNlci5wYXNzd29yZCA9ICcqKioqKic7XG4gICAgICAvL0B0cy1pZ25vcmVcbiAgICAgIHJlcS5zZXNzaW9uWydwcm9maWxlJ10gPSBleGlzdGluZ1VzZXI7XG4gICAgICByZXMuanNvbihleGlzdGluZ1VzZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc2VuZFN0YXR1cyg0MDMpO1xuICAgIH1cbiAgfTtcblxuICBhcHAucG9zdChcIi9hcGkvYXV0aC9sb2dpblwiLCBsb2dpbik7XG4gIGFwcC5wb3N0KFwiL2FwaS9hdXRoL3Byb2ZpbGVcIiwgcHJvZmlsZSk7XG4gIGFwcC5wb3N0KFwiL2FwaS9hdXRoL2xvZ291dFwiLCBsb2dvdXQpO1xuICBhcHAucG9zdChcIi9hcGkvYXV0aC9zaWdudXBcIiwgc2lnbnVwKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0aGVudGljYXRpb25Db250cm9sbGVyOyJdfQ==