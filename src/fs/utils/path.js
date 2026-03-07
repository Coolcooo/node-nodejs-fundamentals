import {fileURLToPath} from "url";
import path from "path";

export const getDirname = (fileUrl) => {
	const __filename = fileURLToPath(fileUrl);
	return path.dirname(__filename);
}