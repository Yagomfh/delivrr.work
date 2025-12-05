import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProjectForm } from "@/components/forms/project-form";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/_app/projects/add")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const createProject = useMutation(
		trpc.projects.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: trpc.projects.list.queryKey(),
				});
				toast.success("Project created successfully");
				navigate({ to: "/app" });
			},
		}),
	);
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Add a new project</h1>
				<p className="text-sm text-muted-foreground">
					Add a new project to your account.
				</p>
			</div>
			<ProjectForm
				onSubmit={async (values) => {
					await createProject.mutateAsync(values);
				}}
			/>
		</div>
	);
}
