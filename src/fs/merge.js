import path from "path";
import fs from "fs/promises";
import process from "process";
import {getArgValues} from "../utils/process.js";
import {ERROR_MESSAGES, throwIsNotExist} from "../utils/throw-error.js";

const TXT_FILE_EXTENSION = ".txt";
const filterFiles = (files, pickFiles) => {
	if (pickFiles) {
		const filesMap = {};
		for (const file of files) {
			filesMap[file] = true;
		}
		const result = [];
		for (const file of pickFiles) {
			if (!filesMap[file]) {
				throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED);
			}
			result.push(file);
		}
		return result;
	}
	for (const file of files) {
		if (path.extname(file) !== TXT_FILE_EXTENSION) {
			throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED);
		}
	}
	return files.slice().sort();
}

const merge = async () => {
	const dirname = import.meta.dirname;
  const partsPath = path.resolve(dirname, "../../workspace/parts");
	await throwIsNotExist(partsPath);
	let files = await fs.readdir(partsPath);
	const filesArgs = getArgValues(process.argv, "--files");
	const filteredFiles = filterFiles(files, filesArgs);
	const filesContent = await Promise.all(filteredFiles.map((file) => fs.readFile(path.resolve(partsPath, file))));
	return fs.writeFile(path.resolve(dirname, "../../workspace/merged.txt"), filesContent.join("\n"));
};

await merge();
