import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const User = {
  create: async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    return await db.run(
      "INSERT INTO users (email, password, is_verified, verification_token) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, false, verificationToken]
    );
  },

  findByEmail: async (email) => {
    return await db.get("SELECT * FROM users WHERE email = ?", [email]);
  },

  findByVerificationToken: async (token) => {
    return await db.get("SELECT * FROM users WHERE verification_token = ?", [
      token,
    ]);
  },

  verifyUser: async (userId) => {
    return await db.run("UPDATE users SET is_verified = ? WHERE id = ?", [
      true,
      userId,
    ]);
  },

  resetPassword: async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await db.run("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);
  },

  getAll: async () => {
    return await db.all("SELECT * FROM users");
  },
};
