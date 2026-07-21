import { z } from "zod";
import type { FieldType } from "@/types";

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

export const formFieldSchema = z.object({
  label: z.string().min(1, "Label is required"),
  fieldKey: z
    .string()
    .min(1, "Field key is required")
    .regex(/^[a-zA-Z0-9_]+$/, "Field key must be alphanumeric or underscore"),
  type: z.enum(fieldTypes as [FieldType, ...FieldType[]]),
  required: z.boolean().default(false),
  order: z.number().int().min(0),
  options: z.array(z.string()).optional(),
  placeholder: z.string().optional(),
});

export const createFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric or hyphen"),
  description: z.string().optional(),
  fields: z
    .array(formFieldSchema)
    .min(1, "At least one field is required")
    .refine(
      (fields) => {
        const keys = fields.map((f) => f.fieldKey);
        return new Set(keys).size === keys.length;
      },
      { message: "Field keys must be unique" }
    ),
});

export const updateFormSchema = createFormSchema.partial().extend({
  fields: z.array(formFieldSchema).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function buildSubmissionSchema(fields: Array<{ fieldKey: string; type: FieldType; required: boolean }>) {
  const shape: Record<string, z.ZodType<unknown>> = {};
  for (const field of fields) {
    let validator: z.ZodType<unknown>;
    switch (field.type) {
      case "email":
        validator = z.string().email("Invalid email");
        break;
      case "date":
        validator = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");
        break;
      case "checkbox":
        validator = z.union([z.boolean(), z.string().transform((v) => v === "true" || v === "on")]);
        break;
      default:
        validator = z.string();
    }
    if (!field.required) {
      validator = validator.optional().or(z.literal(""));
    }
    shape[field.fieldKey] = validator;
  }
  return z.object(shape);
}
