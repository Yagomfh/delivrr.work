/** biome-ignore-all lint/correctness/noChildrenProp: this is a valid use case */

import { useForm } from "@tanstack/react-form";
import { DynamicIcon } from "lucide-react/dynamic";
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
      await onSubmit(value);
    },
  });

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <FieldGroup className="flex flex-col gap-6 w-full">
        <form.Field
          name="icon"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="w-full">
                <FieldLabel>Project Icon</FieldLabel>
                <div className="flex items-center gap-3">
                  <IconPicker
                    value={field.state.value as IconName}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <Button
                      variant="outline"
                      className="h-16 w-16 aspect-square rounded-lg shrink-0"
                    >
                      {field.state.value ? (
                        <DynamicIcon
                          name={field.state.value as IconName}
                          className="size-6"
                        />
                      ) : (
                        <span className="text-sm">Icon</span>
                      )}
                    </Button>
                  </IconPicker>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />

        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="w-full">
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
              <Field data-invalid={isInvalid} className="w-full">
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

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="repository"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="w-full">
                <FieldLabel>GitHub Repository</FieldLabel>
                <GithubRepoField
                  value={field.state.value as string}
                  onChange={(value) => field.handleChange(value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
