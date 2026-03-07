import fs from "fs/promises";
import path from "path";
import {throwIsExist, throwIsNotExist} from "../utils/throw-error.js";

const restore = async () => {
  const restoreWorkspacePath = path.resolve("../../workspace_restored");
  const snapshotPath = path.resolve("../../snapshot.json");

	await Promise.all([throwIsExist(restoreWorkspacePath), throwIsNotExist(snapshotPath)]);

	await fs.mkdir(restoreWorkspacePath);

	const shapshotContent = await fs.readFile(snapshotPath, {encoding: "utf8"});
	const snapshot = JSON.parse(shapshotContent);

	for (const fileInfo of snapshot.entries) {
		const filePath = path.join(restoreWorkspacePath, fileInfo.path);
		switch (fileInfo.type) {
			case "file": {
				await fs.writeFile(filePath, fileInfo.content, {encoding: "base64"});
				break;
			}
			case "directory": {
				await fs.mkdir(filePath);
				break;
			}
			default: {
				break;
			}
		}
	}
};

await restore();
