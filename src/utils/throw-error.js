import fs from "fs/promises";

export const ERROR_MESSAGES = {
	FS_OPERATION_FAILED: "FS operation failed"
};

export const throwIsNotExist = async (path) => {
	try {
		await fs.access(path);
	} catch (e) {
		throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED);
	}
};

export const throwIsExist = async (path) => {
	try {
		await fs.access(path);
	} catch (e) {
		return;
	}
	throw new Error(ERROR_MESSAGES.FS_OPERATION_FAILED);
};