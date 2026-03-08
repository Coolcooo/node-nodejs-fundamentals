import {getIntArgValue, getStringArgValue} from "../utils/process.js";

const HEX_COLOR_REGEXP = /^#[0-9A-F]{6}$/i;
const HIDE_CURSOR_ANSI = "\x1b[?25l";

const getDuration = (argv) => {
	return getIntArgValue(argv, "--duration", 5000);
};

const getInterval = (argv) => {
	return getIntArgValue(argv, "--interval", 100);
};

const getBarLength = (argv) => {
	return getIntArgValue(argv, "--length", 30);
};

const getConsoleColor = (argv) => {
	const argColor = getStringArgValue(argv, "--color");
	if (!argColor) {
		return null;
	}
	if (!HEX_COLOR_REGEXP.test(argColor)) {
		return null;
	}
	return argColor;
};

const getColorText = (text, color) => {
	if (!color) {
		return text;
	}
	const intColor = parseInt(color.slice(1), 16);
	return `\x1b[38;2;${intColor >> 16 & 255 };${intColor >> 8 & 255};${intColor & 255}m${text}\x1b[0m`;
};

const progress = () => {
	const startTime = performance.now();
	const duration = getDuration(process.argv);
	const argInterval = getInterval(process.argv);
	const interval = argInterval > duration ? duration : argInterval;
	const barLength = getBarLength(process.argv);
	const color = getConsoleColor(process.argv);
	const timeoutCallback = () => {
		const currentDuration = performance.now() - startTime;
		const percentProgress = Math.min(currentDuration / duration, 1);
		const barProgress = Math.floor(barLength * percentProgress);
		const emptyProgress = barLength - barProgress;

		const coloredProgress = getColorText(`${"█".repeat(barProgress)}${" ".repeat(emptyProgress)}`, color);
		process.stdout.write(`\r${HIDE_CURSOR_ANSI}[${coloredProgress}] ${Math.floor(percentProgress * 100)}%`);
		if (currentDuration < duration) {
			setTimeout(timeoutCallback, interval);
		} else {
			process.stdout.write("\nDone!\n");
		}
	};
	timeoutCallback();
};

progress();
