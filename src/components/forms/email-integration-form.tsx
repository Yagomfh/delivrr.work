/** biome-ignore-all lint/correctness/noChildrenProp: this is a valid use case */

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRef } from "react";
import { FieldGroup } from "../ui/field";
import {
  TagsInput,
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "../ui/tags-input";
import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

const formSchema = z.object({
  from: z.array(z.email("Invalid email address")),
  cc: z.array(z.email("Invalid email address")),
});

export type EmailIntegrationFormValues = z.infer<typeof formSchema>;

export function EmailIntegrationForm({
  onSubmit,
  initialValues,
  id: formId,
  onDirtyChange,
}: {
  onSubmit: (values: EmailIntegrationFormValues) => Promise<void>;
  initialValues: EmailIntegrationFormValues;
  id: string;
  onDirtyChange?: (isDirty: boolean) => void;
}) {
  const form = useForm({
    defaultValues: {
      from: initialValues.from,
      cc: initialValues.cc,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const prevIsDirtyRef = useRef<boolean | undefined>(undefined);

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      {onDirtyChange && (
        <form.Subscribe
          selector={(state) => state.isDirty}
          children={(isDirty) => {
            if (prevIsDirtyRef.current !== isDirty) {
              prevIsDirtyRef.current = isDirty;
              onDirtyChange(isDirty);
            }
            return null;
          }}
        />
      )}
      <FieldGroup className="flex flex-col gap-6 w-full">
        <form.Field
          name="from"
          children={(field) => {
            return (
              <TagsInput
                value={field.state.value}
                onValueChange={field.handleChange}
                editable
                addOnPaste
              >
                <TagsInputLabel>From</TagsInputLabel>
                <TagsInputList>
                  {field.state.value.map((email) => (
                    <TagsInputItem key={email} value={email}>
                      {email}
                    </TagsInputItem>
                  ))}
                  <TagsInputInput placeholder="Add email address..." />
                </TagsInputList>
                <TagsInputClear asChild>
                  <Button variant="outline">
                    <RefreshCcw className="h-4 w-4" />
                    Clear all
                  </Button>
                </TagsInputClear>
              </TagsInput>
            );
          }}
        />

        <form.Field
          name="cc"
          children={(field) => {
            return (
              <TagsInput
                value={field.state.value}
                onValueChange={field.handleChange}
                editable
                addOnPaste
              >
                <TagsInputLabel>CC</TagsInputLabel>
                <TagsInputList>
                  {field.state.value.map((email) => (
                    <TagsInputItem key={email} value={email}>
                      {email}
                    </TagsInputItem>
                  ))}
                  <TagsInputInput placeholder="Add email address..." />
                </TagsInputList>
                <TagsInputClear asChild>
                  <Button variant="outline">
                    <RefreshCcw className="h-4 w-4" />
                    Clear all
                  </Button>
                </TagsInputClear>
              </TagsInput>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
