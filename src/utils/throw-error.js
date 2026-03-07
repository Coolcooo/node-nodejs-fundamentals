import fs from "fs/promises";

export const throwIsNotExist = async (path) => {
	try {
		await fs.access(path);
	} catch (e) {
		throw new Error("FS operation failed");
	}
};

export const throwIsExist = async (path) => {
	try {
		await fs.access(path);
	} catch (e) {
		return;
	}
	throw new Error("FS operation failed");
};