/**
 * Push notifications via ntfy.sh.
 *
 * When a public form is submitted, a notification is fired to the configured
 * ntfy topic so the team is alerted in real time. See the submit route at
 * `src/app/api/forms/[slug]/submit/route.ts`.
 *
 * - Topic defaults to "Dovesphere-SMS" (override with `NTFY_TOPIC`).
 * - Host defaults to the public ntfy.sh service (override with `NTFY_BASE_URL`
 *   to point at a self-hosted instance).
 *
 * No env vars are required: the defaults work out of the box.
 */
const NTFY_BASE_URL = (process.env.NTFY_BASE_URL ?? "https://ntfy.sh").replace(/\/+$/, "");
const NTFY_TOPIC = process.env.NTFY_TOPIC ?? "Dovesphere-SMS";

export interface NotifyFormSubmissionInput {
  form: {
    name: string;
    slug: string;
    /** Form fields, used to map machine fieldKeys to human-readable labels. */
    fields?: { fieldKey: string; label: string }[];
  };
  /** Validated answers keyed by fieldKey. */
  data: Record<string, unknown>;
  ipAddress?: string | null;
}

/**
 * HTTP header values must be Latin-1 (code points 0-255) — `fetch` rejects
 * anything wider (em dashes, emojis, accented letters) as a ByteString error.
 * The notification body is unaffected (it goes out as UTF-8); only headers
 * need sanitizing.
 */
function toLatin1(value: string): string {
  return value
    .replace(/[^\x00-\xFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
}

/**
 * Sends a push notification about a new form submission.
 *
 * Rejects on a non-OK response so callers can decide how to react — the submit
 * route runs this inside `after()` and swallows any rejection so a notification
 * failure never affects the end user's submission.
 */
export async function notifyFormSubmission({
  form,
  data,
  ipAddress,
}: NotifyFormSubmissionInput): Promise<void> {
  const labelByKey = new Map((form.fields ?? []).map((f) => [f.fieldKey, f.label]));

  const rows = Object.entries(data).map(([key, value]) => {
    const label = labelByKey.get(key) ?? key;
    return `${label}: ${formatValue(value)}`;
  });

  const meta = [`Form: ${form.name}`, `Submitted: ${new Date().toLocaleString()}`];
  if (ipAddress && ipAddress !== "unknown") meta.push(`IP: ${ipAddress}`);

  const body = [...meta, "", rows.length ? rows.join("\n") : "(no fields)"].join("\n");

  const response = await fetch(`${NTFY_BASE_URL}/${NTFY_TOPIC}`, {
    method: "POST",
    headers: {
      // ntfy message metadata is conveyed via request headers. Values must be
      // Latin-1, hence the ASCII hyphen and the toLatin1() sanitization.
      Title: toLatin1(`New submission - ${form.name}`),
      Priority: "default",
      Tags: "incoming_envelope,mailbox",
    },
    body,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`ntfy responded with ${response.status}${detail ? `: ${detail}` : ""}`);
  }
}
