import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAuthUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const AuthUserSchema = new Schema<IAuthUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
AuthUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AuthUserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const AuthUser = mongoose.model<IAuthUser>("AuthUser", AuthUserSchema);
