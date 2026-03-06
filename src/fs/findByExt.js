import process from "process";
import path from "path";
import fs from "fs/promises";
import {getDirname} from "./utils/dirname.js";


const getArgValue = (args, expectedArg) => {
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i];
		if (arg === expectedArg) {
			const value = args[i + 1];
			if (typeof value === "string") {
				return value;
			}
		}
	}
	return null;
}

const findByExt = async () => {
	const processExt = getArgValue(process.argv, "--ext");
	const resultExt = "." + (processExt !== null ? processExt : "txt");
  const workspacePath = path.join(getDirname(import.meta.url), "../../workspace");
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
