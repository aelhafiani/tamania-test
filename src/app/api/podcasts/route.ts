import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term");

  let url: string;
  if (!term || term.trim() === "") {
    url = `https://itunes.apple.com/search?term=podcast&entity=podcast&limit=6`;
  } else {
    url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=podcast&limit=6`;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: `iTunes API error: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({ podcasts: data.results || [] });
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}
