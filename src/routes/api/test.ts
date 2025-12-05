import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";

export const Route = createFileRoute("/api/test")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				const testLLM = await generateText({
					model: "google/gemini-2.0-flash",
					prompt: "Hello, world!",
				});

				console.log(testLLM.text, testLLM.usage, testLLM.providerMetadata);

				return Response.json({
					text: testLLM.text,
					usage: testLLM.usage,
					providerMetadata: testLLM.providerMetadata,
					cost: testLLM.providerMetadata?.google?.cost,
					inputTokens: testLLM.usage?.inputTokens,
					outputTokens: testLLM.usage?.outputTokens,
					totalTokens: testLLM.usage?.totalTokens,
				});
			},
		},
	},
});
