import { createFileRoute } from "@tanstack/react-router";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/app")({
  head: () => ({
    meta: [
      {
        title: "Summaries Overview | delivrr.work",
      },
      {
        name: "description",
        content:
          "View and manage your GitHub activity summaries. Track pull requests, commits, and project updates in one place.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/app`,
      },
    ],
  }),
  component: RouteComponent,
});

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]


function RouteComponent() {

  return (
    <>
      <Combobox items={frameworks}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox></>
  );
}
