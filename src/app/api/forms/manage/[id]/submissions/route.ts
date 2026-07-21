import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { SubmissionData } from "@/types";

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
    const submissions = await prisma.submission.findMany({
      where: { formId: id },
      orderBy: { createdAt: "desc" },
    });

    const result: SubmissionData[] = submissions.map((s) => ({
      id: s.id,
      formId: s.formId,
      data: JSON.parse(s.data) as Record<string, unknown>,
      createdAt: s.createdAt.toISOString(),
      ipAddress: s.ipAddress,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/forms/manage/[id]/submissions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
