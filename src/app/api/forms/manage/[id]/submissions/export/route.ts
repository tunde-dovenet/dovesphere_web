import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function escapeCsv(value: unknown): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const form = await prisma.form.findUnique({
      where: { id },
      include: { fields: { orderBy: { order: "asc" } } },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const submissions = await prisma.submission.findMany({
      where: { formId: id },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      ...form.fields.map((f) => f.label),
      "Submission Date",
      "IP Address",
    ];

    const rows = submissions.map((s) => {
      const data = JSON.parse(s.data) as Record<string, unknown>;
      return [
        ...form.fields.map((f) => {
          const val = data[f.fieldKey];
          if (Array.isArray(val)) return val.join(", ");
          return val;
        }),
        s.createdAt.toISOString(),
        s.ipAddress ?? "",
      ];
    });

    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${form.slug}-submissions.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/forms/manage/[id]/submissions/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
