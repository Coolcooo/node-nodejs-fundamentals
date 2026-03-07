export const getArgValues = (args, expectedArg) => {
	for (let i = 0; i < args.length; i += 1) {
		const arg = args[i];
		if (arg === expectedArg) {
			const values = [];
			for (let j = i + 1; j < args.length; j += 1) {
				const argValue = args[j];
				if (argValue.startsWith("--")) {
					break;
				}
				values.push(argValue);
			}
			return values.length === 0 ? null : values;
		}
	}
	return null;
}