import process from "process";
import path from "path";
import fs from "fs/promises";
import {getStringArgValue} from "../utils/process.js";
import {throwIsNotExist} from "../utils/throw-error.js";

const findByExt = async () => {
	const resultExt = "." + getStringArgValue(process.argv, "--ext", "txt");
  const workspacePath = path.resolve(import.meta.dirname, "../../workspace");
	await throwIsNotExist(workspacePath);
	const files = await fs.readdir(workspacePath, {recursive: true});
	const filesByExt = [];
	for (const file of files) {
		if (path.extname(file) === resultExt) {
			filesByExt.push(file);
		}
	}
	filesByExt.sort();
	for (const file of filesByExt) {
		console.log(file);
	}
};

await findByExt();
