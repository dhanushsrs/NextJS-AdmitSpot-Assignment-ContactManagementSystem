import { db } from "../lib/db";

export const Contact = {
  create: async (userId, name, email, phone) => {
    return await db.run(
      "INSERT INTO contacts (user_id, name, email, phone) VALUES (?, ?, ?, ?)",
      [userId, name, email, phone]
    );
  },

  getAllByUserId: async (userId) => {
    return await db.all("SELECT * FROM contacts WHERE user_id = ?", [userId]);
  },

  delete: async (id) => {
    return await db.run("DELETE FROM contacts WHERE id = ?", [id]);
  },
};
