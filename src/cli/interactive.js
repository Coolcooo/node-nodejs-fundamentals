import readline from "readline";
import path from "path";

const startTime = performance.now();
const interactive = () => {
  const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("close", () => {
		console.log("Goodbye!");
	});

	rl.on("line", (line) => {
		switch (line) {
			case "uptime": {
				const seconds = Math.round((performance.now() - startTime) / 10) /100;
				console.log(`Uptime: ${seconds}s`);
				break;
			}
			case "cwd": {
				console.log(path.resolve("./"));
				break;
			}
			case "date": {
				console.log((new Date()).toISOString());
				break;
			}
			case "exit": {
				rl.close();
				return;
			}
			default: {
				console.log("Unknown command");
				break;
			}
		}
		rl.prompt();
	});
};

interactive();
