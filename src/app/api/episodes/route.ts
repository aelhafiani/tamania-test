import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term");
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  let url: string;
  if (!term || term.trim() === "") {
    url = `https://itunes.apple.com/search?term=podcastEpisode&entity=podcastEpisode&limit=${limit}&offset=${offset}`;
  } else {
    url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=podcastEpisode&limit=${limit}&offset=${offset}`;
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

    return NextResponse.json({
      episodes: data.results || [],
      resultCount: data.resultCount || 0,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 }
    );
  }
}
