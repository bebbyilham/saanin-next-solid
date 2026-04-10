import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id_instansi = searchParams.get("id_instansi");
  const id_category = searchParams.get("id_category");

  if (!id_instansi || !id_category) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const apiUrl = `https://ppid.sumbarprov.go.id/api/cluster-data?id_instansi=${id_instansi}&id_category=${id_category}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!res.ok) {
      return NextResponse.json({ error: `PPID API returned ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
