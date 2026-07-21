export type FieldType = "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio" | "date";

export interface FormFieldDefinition {
  id?: string;
  label: string;
  fieldKey: string;
  type: FieldType;
  required: boolean;
  order: number;
  options?: string[];
  placeholder?: string;
}

export interface FormDefinition {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  fields: FormFieldDefinition[];
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionData {
  id: string;
  formId: string;
  data: Record<string, unknown>;
  createdAt: string;
  ipAddress?: string | null;
}
