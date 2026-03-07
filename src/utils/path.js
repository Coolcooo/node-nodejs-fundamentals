import {fileURLToPath} from "url";
import path from "src/utils/path.js";

export const getDirname = (fileUrl) => {
	const __filename = fileURLToPath(fileUrl);
	return path.dirname(__filename);
}