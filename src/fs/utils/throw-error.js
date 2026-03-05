import fs from "fs/promises";

export const throwIsNotExist = async (path) => {
	try {
		await fs.stat(path);
	} catch (e) {
		throw new Error("FS operation failed");
	}
};

export const throwIsExist = async (path) => {
	try {
		await fs.stat(path);
		throw new Error("FS operation failed");
	} catch (e) {
	}
};