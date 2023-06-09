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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cyber_1 = __importDefault(require("../02-middleware/cyber"));
var error_model_1 = __importDefault(require("../03-models/error-model"));
var axios_1 = __importDefault(require("axios"));
var https_1 = __importDefault(require("https"));
// //פונקציה אשר מבצעת הרשמה בכך שמקבלת אובייקט יוזר חדש, מבצעת את כל הולידציות, שומרת אותו בדאטה בייס ומחזירה טוקן
// async function register(user: IUserModel): Promise<string> {
//   //על אובייקט היוזר הנכנס IUserModelכך אנו מפעילים את הולידציות אשר קבענו בתוך המודל בקובץ ה
//   const errors = user.validateSync();
//   //במידה ויש שגיאות ולידציה אנו נזרוק שגיאות כך
//   if (errors) throw new ErrorModel(400, errors.message);
//   // כאן אנו בודקים האם כבר קיים משתמש במערכת עם שם משתמש זהה כדי שלא יהיו כפילויות
//   const existsUserId = await UserModel.findOne({ username: user.id }).exec();
//   if (existsUserId)
//     throw new ErrorModel(
//       400,
//       `Username ${user.id} This ID already exists in the system.`
//     );
//   await user.save();
//   //כך ניצור טוקן אשר מורכב מפרטי היוזר החדש
//   const token = cyber.getNewToken(user);
//   //וכך נחזיר את הטוקן שיצרנו
//   return token;
// }
//login פונ' אשר מבצעת כניסת
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var agent, response, myData, errors, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("credentials123: ", credentials);
                    agent = new https_1.default.Agent({
                        rejectUnauthorized: false,
                    });
                    return [4 /*yield*/, axios_1.default.get("https://localhost:44397/FoodService.asmx/getOneUser?userId=".concat(credentials.id), {
                            httpsAgent: agent,
                        })];
                case 1:
                    response = _a.sent();
                    myData = response.data;
                    console.log("myData: ", myData);
                    errors = credentials.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    console.log("credentials: ", credentials.id);
                    user = myData[0];
                    console.log("user123: ", user);
                    //אם לא קיים יוזר כזה אנו נזרוק שגיאה
                    if (!user)
                        throw new error_model_1.default(401, "Incorrect username or password");
                    token = cyber_1.default.getNewToken(user);
                    //וכך הפונ' תחזיר להו טוקן במידה ויוזר יעשה לוגין
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.default = {
    //   register,
    login: login,
};
