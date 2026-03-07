import process from "process";
import path from "path";
import fs from "fs/promises";
import {getDirname} from "./utils/dirname.js";
import {getArgValues} from "./utils/process.js";

const findByExt = async () => {
	const processExt = getArgValues(process.argv, "--ext");
	const resultExt = "." + (processExt !== null ? processExt[0] : "txt");
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
