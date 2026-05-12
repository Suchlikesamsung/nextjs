import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export function toErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR", issues: error.issues },
      { status: 400 },
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "DUPLICATE", target: error.meta?.target }, { status: 409 });
    }
    if (error.code === "P2003" || error.code === "P2025") {
      return NextResponse.json({ error: "FOREIGN_KEY" }, { status: 400 });
    }
  }

  console.error(error);
  return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
}
