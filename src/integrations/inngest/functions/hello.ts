import { inngest } from "../client";
export const helloFn = inngest.createFunction(
	{ id: "hello" },
	{ event: "app/hello" },
	async () => {
		console.log("Hello, world!");
		return { message: "Hello, world!" };
	},
);
