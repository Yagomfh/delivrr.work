// biome-ignore lint/suspicious/noExplicitAny: TODO: Fix this
export function transform(evt: any, headers: Record<string, string> = {}) {
	const name = headers["X-Github-Event"];

	return {
		// Use the event as the data without modification
		data: evt,
		// Add an event name, prefixed with "github." based off of the X-Github-Event data
		name: "github." + name.trim().replace("Event", "").toLowerCase(),
	};
}
