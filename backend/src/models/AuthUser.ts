import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAuthUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AuthUserSchema = new Schema<IAuthUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
AuthUserSchema.pre("save", async function (next) {
  const user = this as IAuthUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

AuthUserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const AuthUser = mongoose.model<IAuthUser>("AuthUser", AuthUserSchema);
