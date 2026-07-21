import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSubmissionSchema } from "@/lib/zod-schemas";

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 5;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (valid.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, valid);
    return false;
  }
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return true;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ip = getClientIp(request);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body._gotcha && String(body._gotcha).trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const form = await prisma.form.findUnique({
      where: { slug },
      include: { fields: { orderBy: { order: "asc" } } },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const schema = buildSubmissionSchema(
      form.fields.map((f) => ({
        fieldKey: f.fieldKey,
        type: f.type as "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio" | "date",
        required: f.required,
      }))
    );

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", issues },
        { status: 400 }
      );
    }

    await prisma.submission.create({
      data: {
        formId: form.id,
        data: JSON.stringify(parsed.data),
        ipAddress: ip,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/forms/[slug]/submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
