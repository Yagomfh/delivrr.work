import { inngest } from "../client";

export const githubPushFn = inngest.createFunction(
	{ id: "github-push" },
	{ event: "github.push" },
	async ({ event, step }) => {
		const { data } = event;

		// TODO: match this push to one of your logged-in users by GitHub ID / login
		// TODO: do whatever you need with this info

		return "hello";
	},
);
