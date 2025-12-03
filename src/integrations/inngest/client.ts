import type { PushEvent } from "@octokit/webhooks-types";
import { EventSchemas, Inngest } from "inngest";

type AppEvents = {
	"github.push": {
		data: PushEvent;
	};
};

// Create a client to send and receive events
export const inngest = new Inngest({
	id: "delivrr.work",
	schemas: new EventSchemas().fromRecord<AppEvents>(),
});
