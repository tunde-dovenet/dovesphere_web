"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FormDefinition } from "@/types";

function buildZodSchema(fields: FormDefinition["fields"]) {
  const shape: Record<string, z.ZodSchema<string | boolean | undefined>> = {};
  for (const field of fields) {
    let validator: z.ZodSchema<string | boolean | undefined>;
    switch (field.type) {
      case "email":
        validator = z.string().email("Invalid email address");
        break;
      case "date":
        validator = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format");
        break;
      case "checkbox":
        validator = z.union([z.boolean(), z.literal("true"), z.literal("on"), z.literal(""), z.undefined()]).transform((v) => v === true || v === "true" || v === "on");
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

interface DynamicFormProps {
  form: FormDefinition;
}

export default function DynamicForm({ form }: DynamicFormProps) {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const schema = buildZodSchema(form.fields);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    setServerError(null);
    setFieldErrors({});
    try {
      const res = await fetch(`/api/forms/${form.slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        if (result.issues && Array.isArray(result.issues)) {
          const mapped: Record<string, string> = {};
          for (const issue of result.issues) {
            mapped[issue.path] = issue.message;
          }
          setFieldErrors(mapped);
        } else {
          setServerError(result.error || "Something went wrong");
        }
        return;
      }
      setSuccess(true);
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-azure/30 bg-azure/5 p-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-azure">Thank you!</h3>
        <p className="text-gunmetal">Your submission has been received.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 rounded-md bg-azure px-4 py-2 text-sm font-medium text-white hover:bg-azure/90"
        >
          Submit another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-gunmetal/20 bg-white px-3 py-2 text-sm text-obsidian placeholder:text-gunmetal/50 focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("_gotcha")} tabIndex={-1} autoComplete="off" />
      </div>

      {form.fields.map((field) => {
        const error = errors[field.fieldKey]?.message || fieldErrors[field.fieldKey];
        return (
          <div key={field.fieldKey}>
            <label htmlFor={field.fieldKey} className="mb-1 block text-sm font-medium text-obsidian">
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.fieldKey}
                rows={4}
                placeholder={field.placeholder}
                className={inputClass}
                {...register(field.fieldKey)}
              />
            ) : field.type === "select" ? (
              <select id={field.fieldKey} className={inputClass} {...register(field.fieldKey)}>
                <option value="">Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div className="flex items-center gap-2">
                <input
                  id={field.fieldKey}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gunmetal/30 text-azure focus:ring-azure"
                  {...register(field.fieldKey)}
                />
                <span className="text-sm text-gunmetal">Yes</span>
              </div>
            ) : field.type === "radio" ? (
              <div className="space-y-2">
                {field.options?.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opt}
                      className="h-4 w-4 border-gunmetal/30 text-azure focus:ring-azure"
                      {...register(field.fieldKey)}
                    />
                    <span className="text-sm text-gunmetal">{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                id={field.fieldKey}
                type={field.type === "phone" ? "tel" : field.type}
                placeholder={field.placeholder}
                className={inputClass}
                {...register(field.fieldKey)}
              />
            )}
            {error && <p className="mt-1 text-xs text-red-600">{String(error)}</p>}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-obsidian px-4 py-2.5 text-sm font-medium text-white hover:bg-gunmetal disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
