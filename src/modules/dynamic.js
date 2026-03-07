import readline from "readline";

const dynamic = async () => {
	const rl = readline.createInterface({
		input: process.stdin
	});
	for await (const line of rl) {
		let module;
		switch (line) {
			case "repeat": {
				module = await import("./plugins/repeat.js");
				break;
			}
			case "reverse": {
				module = await import("./plugins/reverse.js");
				break;
			}
			case "uppercase": {
				module = await import("./plugins/uppercase.js");
				break;
			}
			default: {
				console.log("Plugin not found");
				process.exit(1);
				return;
			}
		}
		console.log(module.run());
	}
};

await dynamic();
