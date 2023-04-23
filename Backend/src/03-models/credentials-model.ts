import { Document, model, Schema } from "mongoose";

//אינטרפייס עם שדות
export interface ICredentialsModel extends Document {
  id: Number;
}

//שכמת ולידציה
const CredentialsSchema = new Schema<ICredentialsModel>({
  id: {
    type: Number,
    unique: true,
    required: [true, "Missing id"],
    minlength: [2, "id too short"],
    maxlength: [100, "id too long"],

    //מוחק רווחים לא רצויים וכאלה
    trim: true,
    versionKey: false,
  },
});

//cart-item-model הסבר ב
export const CredentialsModel = model<ICredentialsModel>(
  "CredentialsModel",
  CredentialsSchema,
  "users"
);
