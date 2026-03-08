import fs from "fs";
import readline from "readline";
import path from "path";
import {getIntArgValue} from "../utils/process.js";

const split = async () => {
	const sourcePath = path.resolve(import.meta.dirname, "../../source.txt");
	const stream = fs.createReadStream(sourcePath);
	const rl = readline.createInterface({
		input: stream,
		crlfDelay: Infinity
	});

	let chunkNumber = 1;
	let lineCounter = 0;
	const maxLines = getIntArgValue(process.argv, "--lines", 10);
	let writeStream = null;
	for await (const line of rl) {
		if (!writeStream) {
			const chunkPath = path.resolve(import.meta.dirname, `../../chunk_${chunkNumber}.txt`);
			writeStream = fs.createWriteStream(chunkPath);
		}
		lineCounter += 1;
		if (maxLines === lineCounter) {
			writeStream.end(line);
			lineCounter = 0;
			writeStream = null;
			chunkNumber += 1;
		} else {
			const isCanWrite = writeStream.write(`${line}\n`);
			if (!isCanWrite) {
				rl.pause();
				writeStream.once("drain", rl.resume.bind(rl));
			}
		}
	}
};

await split();
