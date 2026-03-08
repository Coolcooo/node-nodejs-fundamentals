import fs from "fs/promises";
import {createReadStream} from "fs";
import path from "path";
import crypto from "crypto";
import {throwIsNotExist} from "../utils/throw-error.js";

const verify = async () => {
	const __dirname = import.meta.dirname;
	const checksumsPath = path.resolve(__dirname, "../../checksums.json");
	await throwIsNotExist(checksumsPath);
	const checksumsContent = await fs.readFile(checksumsPath, "utf8");
	const hashFilesPath = path.resolve(__dirname, "../../workspace/hash");
	const checksums = JSON.parse(checksumsContent);
	const hashFiles = await fs.readdir(hashFilesPath);
	for (const file of hashFiles) {
		const hash = crypto.createHash("sha256");
		const fileStream = createReadStream(path.resolve(hashFilesPath, file));
		for await (const chunk of fileStream) {
			hash.update(chunk);
		}
		const digest = hash.digest("hex");
		if (checksums[file] === digest) {
			console.log(`${file} - OK`);
		} else {
			console.log(`${file} - FAIL`);
		}
	}
};

await verify();
