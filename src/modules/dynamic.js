const dynamic = async () => {
	const moduleName = process.argv[2];
	let module;
	switch (moduleName) {
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
};

await dynamic();
