import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProjectForm } from "@/components/forms/project-form";
import { useTRPC } from "@/integrations/trpc/react";
import { Button } from "@/components/ui/button";
import { useId } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSelectedProject } from "@/hooks/use-project";

export const Route = createFileRoute("/_app/projects/add")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const {setSelected} = useSelectedProject();
	const createProject = useMutation(
		trpc.projects.create.mutationOptions({
			onSuccess: ([data]) => {
				queryClient.invalidateQueries({
					queryKey: trpc.projects.list.queryKey(),
				})
				toast.success("Project created successfully");
				navigate({ to: "/app" })
				setTimeout(() => {
					setSelected(data.id);
				}, 500);
			},
		}),
	);
	const formId = useId();
	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between items-center">

			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Add a new project</h1>
				<p className="text-sm text-muted-foreground">
					Add a new project and connect a GitHub repository to start summarizing your work.
				</p>
			</div>
			<Button type="submit" form={formId} disabled={createProject.isPending}>{createProject.isPending && <Spinner />} Create</Button>
			</div>
			<ProjectForm
				id={formId}
				onSubmit={async (values) => {
					await createProject.mutateAsync(values);
				}}
			/>
		</div>
	);
}
