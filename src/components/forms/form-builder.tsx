"use client";

import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FieldType, FormFieldDefinition, FormDefinition } from "@/types";

const fieldTypes: FieldType[] = [
  "text",
  "email",
  "phone",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "date",
];

const fieldSchema = z.object({
  label: z.string().min(1, "Label required"),
  fieldKey: z.string().min(1, "Key required").regex(/^[a-zA-Z0-9_]+$/, "Alphanumeric/underscore only"),
  type: z.enum(fieldTypes as [FieldType, ...FieldType[]]),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z.string().optional(),
});

const builderSchema = z.object({
  name: z.string().min(1, "Name required"),
  slug: z.string().min(1, "Slug required").regex(/^[a-z0-9-]+$/, "Lowercase alphanumeric/hyphen only"),
  description: z.string().optional(),
  fields: z.array(fieldSchema).min(1, "At least one field"),
});

type BuilderFormValues = {
  name: string;
  slug: string;
  description?: string;
  fields: Array<{
    label: string;
    fieldKey: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string;
  }>;
};

interface FormBuilderProps {
  initial?: FormDefinition;
  onSave: (data: {
    name: string;
    slug: string;
    description?: string;
    fields: Omit<FormFieldDefinition, "id">[];
  }) => void;
  onCancel: () => void;
}

function FieldRow({
  index,
  control,
  register,
  errors,
  move,
  remove,
  total,
  inputClass,
}: {
  index: number;
  control: ReturnType<typeof useForm<BuilderFormValues>>["control"];
  register: ReturnType<typeof useForm<BuilderFormValues>>["register"];
  errors: ReturnType<typeof useForm<BuilderFormValues>>["formState"]["errors"];
  move: (from: number, to: number) => void;
  remove: (index: number) => void;
  total: number;
  inputClass: string;
}) {
  const type = useWatch({ control, name: `fields.${index}.type` });
  const needsOptions = type === "select" || type === "radio";

  return (
    <div className="rounded-lg border border-gunmetal/10 bg-chalk/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-gunmetal">Field #{index + 1}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => move(index, index - 1)}
            className="rounded border border-gunmetal/20 px-2 py-1 text-xs text-gunmetal hover:bg-white disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => move(index, index + 1)}
            className="rounded border border-gunmetal/20 px-2 py-1 text-xs text-gunmetal hover:bg-white disabled:opacity-30"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => remove(index)}
            className="ml-1 rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gunmetal">Label</label>
          <input {...register(`fields.${index}.label`)} className={inputClass} placeholder="Label" />
          {errors.fields?.[index]?.label && (
            <p className="mt-1 text-xs text-red-600">{errors.fields[index]?.label?.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gunmetal">Key</label>
          <input {...register(`fields.${index}.fieldKey`)} className={inputClass} placeholder="field_key" />
          {errors.fields?.[index]?.fieldKey && (
            <p className="mt-1 text-xs text-red-600">{errors.fields[index]?.fieldKey?.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gunmetal">Type</label>
          <select {...register(`fields.${index}.type`)} className={inputClass}>
            {fieldTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-3">
          <label className="flex items-center gap-2 text-sm text-gunmetal">
            <input type="checkbox" {...register(`fields.${index}.required`)} className="h-4 w-4 rounded border-gunmetal/30 text-azure focus:ring-azure" />
            Required
          </label>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gunmetal">Placeholder</label>
          <input {...register(`fields.${index}.placeholder`)} className={inputClass} placeholder="Placeholder text" />
        </div>
        {needsOptions && (
          <div>
            <label className="mb-1 block text-xs font-medium text-gunmetal">Options (comma separated)</label>
            <input {...register(`fields.${index}.options`)} className={inputClass} placeholder="Option 1, Option 2" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormBuilder({ initial, onSave, onCancel }: FormBuilderProps) {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BuilderFormValues>({
    resolver: zodResolver(builderSchema),
    defaultValues: initial
      ? {
          name: initial.name,
          slug: initial.slug,
          description: initial.description ?? undefined,
          fields: initial.fields.map((f) => ({
            label: f.label,
            fieldKey: f.fieldKey,
            type: f.type,
            required: f.required,
            placeholder: f.placeholder ?? undefined,
            options: f.options ? f.options.join(", ") : undefined,
          })),
        }
      : {
          name: "",
          slug: "",
          description: "",
          fields: [
            { label: "", fieldKey: "", type: "text", required: false, placeholder: "", options: "" },
          ],
        },
  });

  const { fields, append, remove, move } = useFieldArray({ control, name: "fields" });

  const onSubmit = (values: BuilderFormValues) => {
    setGlobalError(null);
    const fieldKeys = values.fields.map((f) => f.fieldKey);
    if (new Set(fieldKeys).size !== fieldKeys.length) {
      setGlobalError("Field keys must be unique");
      return;
    }
    onSave({
      name: values.name,
      slug: values.slug,
      description: values.description,
      fields: values.fields.map((f, i) => ({
        label: f.label,
        fieldKey: f.fieldKey,
        type: f.type,
        required: f.required,
        order: i,
        placeholder: f.placeholder || undefined,
        options: f.options
          ? f.options
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      })),
    });
  };

  const inputClass =
    "w-full rounded-md border border-gunmetal/20 bg-white px-3 py-2 text-sm text-obsidian placeholder:text-gunmetal/50 focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {globalError && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{globalError}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-obsidian">Form Name</label>
          <input {...register("name")} className={inputClass} placeholder="e.g. Contact Us" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-obsidian">Slug</label>
          <input {...register("slug")} className={inputClass} placeholder="e.g. contact" />
          {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-obsidian">Description</label>
        <input {...register("description")} className={inputClass} placeholder="Optional description" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-obsidian">Fields</h3>
          <button
            type="button"
            onClick={() =>
              append({ label: "", fieldKey: "", type: "text", required: false, placeholder: "", options: "" })
            }
            className="rounded-md bg-azure px-3 py-1.5 text-xs font-medium text-white hover:bg-azure/90"
          >
            + Add Field
          </button>
        </div>

        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            move={move}
            remove={remove}
            total={fields.length}
            inputClass={inputClass}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-obsidian px-5 py-2.5 text-sm font-medium text-white hover:bg-gunmetal disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initial ? "Update Form" : "Create Form"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gunmetal/20 px-5 py-2.5 text-sm font-medium text-gunmetal hover:bg-chalk"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
