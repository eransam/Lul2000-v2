import cyber from "../02-middleware/cyber";
import ErrorModel from "../03-models/error-model";
import { ICredentialsModel } from "./../03-models/credentials-model";
import { IUserModel, UserModel } from "./../03-models/user-model";
import http from "http";
import axios from "axios";
import https from "https";

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
async function login(credentials: ICredentialsModel): Promise<string> {
  console.log("credentials123: ", credentials);
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const response = await axios.get(
    `https://localhost:44397/FoodService.asmx/getOneUser?userId=${credentials.id}`,
    {
      httpsAgent: agent,
    }
  );
  const myData = response.data;
  console.log("myData: ", myData);
  //ICredentialsModel אשר בתוכו יצרנו את  credentials-model כאן אנו נבצע על הפרמטר את הולידציות אשר רשמנו בקובץ ה
  const errors = credentials.validateSync();
  if (errors) throw new ErrorModel(400, errors.message);
  console.log("credentials: ", credentials.id);

  //password כך אנו נשנה ונצפין את הערך שהוכנס בתוך הפרופרטי
  //   credentials.password = cyber.hash(credentials.password);

  //אנו נכסים לתוך המשתנה יותר את האובייקט מהדאטה בייס עם הנתונים התואמים find בעזרת הפקודה השמורה
  //אנו נרשום את האובייקט  find מטעמי אבטחה אנו לא נרצה לחשוף שוב את הפרופרטיז הרגישים אז בארגונט השני של הפונקציה
  // שזה בעצם אומר שכל פרופרטי שנשווה אותו ל0 לא יוצג שזה בעצם כמו פעולה המחיקה { password: 0, socialSecurityNumber: 0 }
  //   const users = await UserModel.find({ id: credentials.id }).exec();

  //כדי לחלץ את המידע ממערך users[0] מחזירה את הערך כמערך ולכן כאשר אנו נרצה לחלץ את הערכים אנו נכניס למשתנה שלנו את הערך כך findפונ ה
  const user = myData[0];

  console.log("user123: ", user);

  //אם לא קיים יוזר כזה אנו נזרוק שגיאה
  if (!user) throw new ErrorModel(401, `Incorrect username or password`);

  //וכך בעצם אנו נייצר עוד תוקן עם פרטי היוזר ללא הפרופרטיז הרגישים
  const token = cyber.getNewToken(user);

  //וכך הפונ' תחזיר להו טוקן במידה ויוזר יעשה לוגין
  return token;
}

export default {
//   register,
  login,
};
