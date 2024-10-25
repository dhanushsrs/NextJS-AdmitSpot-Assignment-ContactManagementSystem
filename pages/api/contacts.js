import { Contact } from "../../models/Contact";
import { contactSchema } from "../../utils/validate";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const contactData = req.body;
    try {
      await contactSchema.validate(contactData);
      await Contact.create(contactData);
      return res.status(201).json({ message: "Contact created" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    const { timezone } = req.query; // Get user timezone from query
    const contacts = await Contact.getAll(timezone);
    return res.status(200).json(contacts);
  }
}
