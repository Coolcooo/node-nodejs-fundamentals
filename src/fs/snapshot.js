import fs from "fs/promises";
import path from "node:path";

const snapshot = async () => {
	const rootPath = path.resolve("../../workspace");

	try {
		const rootStats = await fs.stat(rootPath);
	} catch (e) {
		throw new Error("FS operation failed");
	}

	const result = {
		rootPath: rootPath,
		entries: []
	};

	const files = await fs.readdir(rootPath, {recursive: true});
  for (const file of files) {
		const absolutePath = path.join(rootPath, file);
		const fileInfo = {path: file};
		const stats = await fs.stat(absolutePath);

		if (stats.isFile()) {
			fileInfo.type = "file";
			fileInfo.size = stats.size;
			fileInfo.content = await fs.readFile(absolutePath, {encoding: "base64"});
		} else {
			fileInfo.type = "directory";
		}

		result.entries.push(fileInfo);
	}

	fs.writeFile("../../snapshot.json", JSON.stringify(result));
};

await snapshot();
