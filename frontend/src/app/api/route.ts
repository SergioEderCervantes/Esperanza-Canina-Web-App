import { NextResponse } from "next/server";
import { perritosList } from "@/api/sdk.gen";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;

  try {
    const res = await perritosList({
      query: { page },
      security: [],
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error en API /api/perritos:", error);
    return NextResponse.json({ error: "No se pudieron obtener los perritos" }, { status: 500 });
  }
}
