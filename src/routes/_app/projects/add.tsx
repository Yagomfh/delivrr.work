import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProjectForm } from "@/components/forms/project-form";
import { useTRPC } from "@/integrations/trpc/react";
import { Button } from "@/components/ui/button";
import { useId } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSelectedProject } from "@/hooks/use-project";
import { MainCard } from "@/components/cards/main-card";
import { FolderPlus } from "lucide-react";
import { PageHeader } from "@/components/headers/page-header";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/projects/add")({
  head: () => ({
    meta: [
      {
        title: "Add Project | delivrr.work",
      },
      {
        name: "description",
        content:
          "Create a new project and connect a GitHub repository to start generating automated summaries.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/projects/add`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { setSelected } = useSelectedProject();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: ([data]) => {
        queryClient.invalidateQueries({
          queryKey: trpc.projects.list.queryKey(),
        });
        toast.success("Project created successfully");
        navigate({ to: "/app" });
        setTimeout(() => {
          setSelected(data.id);
        }, 500);
      },
    })
  );
  const formId = useId();
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Add a new project"
        description="Add a new project and connect a GitHub repository to start summarizing your work."
        action={
          <Button
            type="submit"
            form={formId}
            disabled={createProject.isPending}
          >
            {createProject.isPending && <Spinner />} Create
          </Button>
        }
      />
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <FolderPlus className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Project Details</MainCard.Title>
              <MainCard.Description>
                Configure your project settings
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col items-stretch w-full">
          <ProjectForm
            id={formId}
            onSubmit={async (values) => {
              await createProject.mutateAsync(values);
            }}
          />
        </MainCard.Content>
      </MainCard.Root>
    </div>
  );
}
