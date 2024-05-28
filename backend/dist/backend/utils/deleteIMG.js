import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
export function deleteImage(imagePath, next) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(imagePath, "in delete Image function");
    const fullImagePath = path.join(__dirname, "..", "public", "img", "posts", imagePath);
    console.log(fullImagePath, "full path here");
    fs.unlink(fullImagePath, (err) => {
        if (err) {
            console.error("Error deleting image file:", err);
            return next(err);
        }
        console.log("Image file deleted successfully:", fullImagePath);
    });
}
