import express, { Request, Response } from "express";
import { single, multiple } from "/Users/reihanoktavio/Documents/Sanbercode/tugasNodeJS/source-code-multer/src/middlewares/upload.middleware";
import { handleUpload } from "/Users/reihanoktavio/Documents/Sanbercode/tugasNodeJS/source-code-multer/src/utils/cloudinary";

const PORT = 3000;

function init() {
  const app = express();

  app.post("/single", single, async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const result = await handleUpload((req.file as any).buffer.toString("base64"));
      res.status(200).json({ message: "File uploaded successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file", error });
    }
  });

  app.post("/multiple", multiple, async (req: Request, res: Response) => {
    if (!req.files || (req.files as any[]).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    try {
      const results = await Promise.all(
        (req.files as any[]).map(file => handleUpload(file.buffer.toString("base64")))
      );
      res.status(200).json({ message: "Files uploaded successfully", data: results });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload files", error });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();