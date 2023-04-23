import { Document, model, Schema } from "mongoose";
import CityEnum from "./city-enum";
import RoleEnum from "./role-enum";

//אינטר פייס ושדות המודל
export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  userId: number;
  status: boolean;
  role: RoleEnum;
}

//סכמת ולידציה
const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      //סוג השדה
      type: String,

      //שדה חובה
      required: [true, "Missing  first name"],
      minlength: [2, "First name too short"],
      maxlength: [100, "First name too long"],

      //מונע רווחים ותווים מיותרים
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [1, "Last name too short"],
      maxlength: [100, "Last name too long"],
      //מונע רווחים ותווים מיותרים
      trim: true,
    },
    userId: {
      type: Number,
      required: [true, "Missing username"],
      minlength: [2, "Username too short"],
      maxlength: [100, "Username too long"],

      //מונע רווחים ותווים מיותרים
      trim: true,
    },
    role: {
      type: Number,
      required: [true, "Missing role"],
      enum: RoleEnum,

      //RoleEnum.User כך שדה זה יקבל באופן דיפולטיבי את הערך הנמצא תחת
      //הוא הטייפ אותו יצרנו באופן ידני RoleEnum ה
      default: RoleEnum.User,
      min: [0, "Role can't be negative"],
      max: [1, "Role can't exceed 1"],
    },
  },
  {
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false,
  }
);

//cart-item-model הסבר ב
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");
