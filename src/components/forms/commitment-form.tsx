import { useForm, useStore } from "@tanstack/react-form";
import { z } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Bug, CalendarIcon, Circle, CircleCheck, CircleDashed, CircleDotDashed, CircleOff, LoaderCircle, RefreshCcw, Star } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc/react";
import { ShadcnTemplate } from "../editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  projectId: z.number().nullable(),
  description: z.string().nullable(),
  status: z.enum(["backlog", "todo", "in_progress", "done", "cancelled"]),
  dueDate: z.date().nullable(),
  label: z.enum(["bug", "feature", "improvement", "other"]).nullable(),
});

export type CommitmentFormValues = z.infer<typeof formSchema>;

const statusOptions = [
  { value: "backlog", label: "Backlog", icon: <CircleDashed /> },
  { value: "todo", label: "Todo", icon: <CircleDotDashed /> },
  { value: "in_progress", label: "In Progress", icon: <LoaderCircle /> },
  { value: "done", label: "Done", icon: <CircleCheck /> },
  { value: "cancelled", label: "Cancelled", icon: <CircleOff /> },
] as const;

const labelOptions = [
  { value: "bug", label: "Bug", icon: <Bug /> },
  { value: "feature", label: "Feature", icon: <Star /> },
  { value: "improvement", label: "Improvement", icon: <RefreshCcw /> },
  { value: "other", label: "Other", icon: <Circle /> },
] as const;

export function CommitmentForm({
  onSubmit,
  id: formId,
  defaultValues
}: {
  onSubmit: (values: CommitmentFormValues) => Promise<void>;
  id: string;
  defaultValues?: Partial<CommitmentFormValues>;
  onSuccess?: () => void;
  onSubmissionStateChange?: (isSubmitting: boolean) => void;
}) {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? null,
      status: (defaultValues?.status as CommitmentFormValues["status"]) ?? "backlog",
      dueDate: defaultValues?.dueDate ?? null,
      label: (defaultValues?.label as CommitmentFormValues["label"]) ?? null,
      projectId: defaultValues?.projectId ?? null,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  const projects = useQuery(trpc.projects.list.queryOptions());

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <FieldGroup className="flex flex-col gap-5 w-full">
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="w-full">
                <FieldLabel className="sr-only">Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Title..."
                  autoComplete="off"
                />
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
                <ShadcnTemplate className="h-[300px] border border-border rounded-lg p-2" placeholder="Start typing..." />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <div className="grid grid-cols-4 gap-4">
          <form.Field
            name="projectId"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="w-full">
                  <Select
                    name={field.name}
                    value={projects.data?.find((project) => project.id === field.state.value)?.id.toString() ?? undefined}
                    onValueChange={(value) =>
                      field.handleChange(value ? parseInt(value) : null)
                    }
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={isInvalid}
                    >
                      <SelectValue id={field.name} placeholder="Project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {projects?.data?.length === 0 && (
                        <SelectItem value="none" disabled>
                          No projects
                        </SelectItem>
                      )}
                      {projects.data?.map((option) => (
                        <SelectItem key={option.id} value={option.id.toString()}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="status"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="w-full">
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as CommitmentFormValues["status"])
                    }
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={isInvalid}
                    >
                      <SelectValue id={field.name} placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {option.icon}
                          </div>
                          <span className="text-sm">
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="label"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="w-full">
                  <Select
                    name={field.name}
                    value={field.state.value ?? undefined}
                    onValueChange={(value) =>
                      field.handleChange(value as CommitmentFormValues["label"])
                    }
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={isInvalid}
                    >
                      <SelectValue id={field.name} placeholder="Label..." />
                    </SelectTrigger>
                    <SelectContent>
                      {labelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {option.icon}
                          </div>
                          <span className="text-sm">
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="dueDate"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="w-full">
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ? format(field.state.value, "dd/MM/yyyy") : ""}
                      placeholder="Due date"
                      className="bg-background pr-10"
                      onChange={(e) => {
                        try {
                          const date = new Date(e.target.value)
                          if (!isNaN(date.getTime())) {
                            field.handleChange(date)
                          } else {
                            field.handleChange(null)
                          }
                        } catch (error) {
                          field.handleChange(null)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault()
                          setOpen(true)
                        }
                      }}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.handleChange(date ?? null)
                            setOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
      </FieldGroup>
    </form>
  );
}