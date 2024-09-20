import { model, Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  role: String;
  phoneNumber?: String;
  profile_img?: {
    type: String;
    default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D";
  };
  address: String;
  created_at: Date;
  updated_at: Date;
}
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  lastName: { type: String, required: [true, "Хэрэглэгчийн нэрийг оруулах"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн имейл оруулах"],
  },
  password: {
    type: String,
    minlength: [8, "Хэрэглэгчийн пасс хамгийн багадаа 8 тэмдэгт байна"],
    required: [true, "Хэрэглэгчийн түлхүүр үг оруулах"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  phoneNumber: String,
  profile_img: String,
  address: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = model("user", userSchema);
export default User;
