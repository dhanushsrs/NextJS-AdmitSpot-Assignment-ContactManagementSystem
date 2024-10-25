import multer from "multer";
import { parseCsv } from "../../utils/parseCsv";

const upload = multer({ dest: "uploads/" });

export default function handler(req, res) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload failed" });
    }
    try {
      const contacts = await parseCsv(req.file.path);
      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
}
