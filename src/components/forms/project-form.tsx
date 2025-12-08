/** biome-ignore-all lint/correctness/noChildrenProp: this is a valid use case */

import { useForm } from "@tanstack/react-form";
import { DynamicIcon } from "lucide-react/dynamic";
import { useId, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { GithubRepoField } from "../fields/github-repo-field";
import type { IconName } from "../ui/icon-picker";
import { IconPicker } from "../ui/icon-picker";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
	name: z
		.string()
		.min(5, "Name must be at least 5 characters.")
		.max(20, "Name must be at most 20 characters."),
	description: z.string().max(30, "Description must be at most 30 characters."),
	repository: z.string().min(1, "Select one repository."),
	icon: z.string().min(1, "Select one icon."),
});

export type ProjectFormValues = z.infer<typeof formSchema>;

export function ProjectForm({
	onSubmit,
	id: formId,
}: {
	onSubmit: (values: ProjectFormValues) => Promise<void>;
	id: string;
}) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			repository: "",
			icon: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await onSubmit(value).catch(() => {
				setIsLoading(false);
			});
		},
	});

	return (
		<div>
			<form
				id={formId}
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
					<FieldGroup className="flex flex-col gap-12">
						<FieldGroup className="flex flex-row gap-8">
							<div className="flex items-center justify-center">
								<div className="px-10">
									<form.Field
										name="icon"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<IconPicker
														value={field.state.value as IconName}
														onValueChange={(value) => field.handleChange(value)}
													>
														<Button
															variant="outline"
															className="h-25 w-25 aspect-square rounded-full"
														>
															{field.state.value ? (
																<DynamicIcon
																	name={field.state.value as IconName}
																/>
															) : (
																"Icon"
															)}
														</Button>
													</IconPicker>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
								</div>
							</div>
							<FieldGroup className="flex flex-col gap-4 flex-1">
								<form.Field
									name="name"
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel>Name</FieldLabel>
												<InputGroup>
													<InputGroupInput
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Delivrr Work"
														autoComplete="off"
													/>

													<InputGroupAddon align="inline-end">
														{field.state.value.length}/20 characters
													</InputGroupAddon>
												</InputGroup>
												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
								<form.Field
									name="description"
									children={(field) => {
										const isInvalid =
											field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel>Description (optional)</FieldLabel>
												<InputGroup>
													<InputGroupInput
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Delivering work to customers."
														autoComplete="off"
													/>
													<InputGroupAddon align="inline-end">
														{field.state.value.length}/30 characters
													</InputGroupAddon>
												</InputGroup>

												{isInvalid && (
													<FieldError errors={field.state.meta.errors} />
												)}
											</Field>
										);
									}}
								/>
							</FieldGroup>
						</FieldGroup>
						
						<form.Field
							name="repository"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<GithubRepoField
											value={field.state.value as string}
											onChange={(value) => field.handleChange(value)}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						
					</FieldGroup>
			</form>
		</div>
	);
}
