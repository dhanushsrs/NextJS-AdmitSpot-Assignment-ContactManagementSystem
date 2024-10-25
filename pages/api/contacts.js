import { Contact } from "../../models/Contact";
import { authenticate } from "../../lib/auth";

export default async function handler(req, res) {
  await authenticate(req, res); // Ensure user is authenticated before proceeding

  switch (req.method) {
    case "POST":
      return await createContact(req, res);
    case "GET":
      return await getContacts(req, res);
    case "DELETE":
      return await deleteContact(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.user.id; // User must be authenticated

  try {
    await Contact.create(userId, name, email, phone);
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

const getContacts = async (req, res) => {
  const userId = req.user.id; // User must be authenticated

  try {
    const contacts = await Contact.getAllByUserId(userId);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve contacts" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.query;

  try {
    await Contact.delete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
